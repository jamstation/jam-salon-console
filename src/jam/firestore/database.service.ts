import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { first, map, switchMap, tap } from "rxjs/operators";
import { Table } from "./table.model";
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from "angularfire2/firestore";
import { mapFirestoreSnapshotToValue, mapFirestoreSnapshotsToValues } from "../rxjs-operator-library";
import { TableData } from "../model-library";
import { WhereFilterOp, WriteBatch, DocumentReference } from "@firebase/firestore-types";
import { concatObservablesToArray, filterObject, filterOutObjectByValue, getCaller } from "../function-library";
import { Store, select } from "@ngrx/store";
import { DatabaseModuleState } from "./database.state";

@Injectable()
export class DatabaseService
{

    private suppressConsoleMessages: boolean = false;
    private tables: Table[];

    constructor ( public firestore: AngularFirestore, private store: Store<DatabaseModuleState> )
    {
        this.store.pipe( select( state => state.databaseState.tables ) )
            .subscribe( tables => this.tables = tables );
    }

    public isValidPath ( path: string ): boolean
    {
        return ( path && path.indexOf( '{' ) < 0 );
    }

    public getTablePathSnapshot ( tableName: string ): string
    {
        return tableName.startsWith( '/' )
            ? tableName.replace( /(\/\/+)/g, '/' )
            : ( this.tables.find( item => item.key == tableName ) || { key: null, path: null } ).path;
    }

    public getCollection<T extends TableData>( tableName: string, queryFn?: QueryFn ): AngularFirestoreCollection<T>
    {
        const path = this.getTablePathSnapshot( tableName );

        console.log( '[Database]', '(Table: ' + path + ')', getCaller().functionName );

        return this.isValidPath( path )
            ? this.firestore.collection<T>( path, queryFn )
            : null;
    }

    public exists<T extends TableData>( tableName: string, key: string ): Observable<boolean>
    {
        if ( !key ) return Observable.of<boolean>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<boolean>( null );

        return collection.doc<T>( key ).snapshotChanges().pipe(
            first(),
            map( snapshot => snapshot.payload.exists ) );
    }

    public get<T extends TableData>( tableName: string, key: string ): Observable<T>
    {
        if ( !key ) return Observable.of<T>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<T>( null );

        return collection.doc<T>( key ).snapshotChanges().pipe( mapFirestoreSnapshotToValue<T>() );
    }

    public find<T extends TableData>( tableName: string, searchColumn: keyof T, searchKey: any ): Observable<T>
    {
        if ( !searchColumn || searchKey === undefined ) return Observable.of<T>( null );

        return this.filter<T>( tableName, searchColumn, '==', searchKey ).map( list => list[ 0 ] || null );
    }

    public lookup<T extends TableData>( tableName: string, searchColumn: keyof T, searchKey: any ): Observable<T>
    {
        if ( searchKey === undefined ) return Observable.of<T>( null );

        return searchColumn
            ? this.find<T>( tableName, searchColumn, searchKey ).pipe( first() )
            : this.get<T>( tableName, searchKey ).pipe( first() );
    }

    public forceLookup<T extends TableData>( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<T>
    {
        return this.lookup<T>( tableName, searchColumn, searchKey ).pipe(
            switchMap( lookedupItem => lookedupItem
                ? Observable.of( lookedupItem )
                : this.add( tableName, item ).pipe(
                    switchMap( key => this.lookup<T>( tableName, undefined, key ) ) ) ) );
    }

    public list<T extends TableData>( tableName: string ): Observable<T[]>
    {
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<T[]>( null );

        return collection.snapshotChanges().pipe( mapFirestoreSnapshotsToValues() );
    }

    public query<T extends TableData>( tableName: string, queryFn: QueryFn ): Observable<T[]>
    {
        const collection = this.getCollection<T>( tableName, queryFn );
        if ( !collection ) return Observable.of<T[]>( null );

        return collection.snapshotChanges().pipe( mapFirestoreSnapshotsToValues() );
    }

    public listFirst<T extends TableData>( tableName: string, limit: number ): Observable<T[]>
    {
        return this.query( tableName, ref => ref.limit( limit ) );
    }

    public filter<T extends TableData>( tableName: string, searchColumn: keyof T, operator: WhereFilterOp, searchKey: any ): Observable<T[]>
    {
        return this.query( tableName, ref => ref.where( searchColumn, operator, searchKey ) );
    }

    public findMany<T extends TableData>( tableName: string, searchColumn: keyof T, searchKeys: any[] ): Observable<T[]>
    {
        const items = searchKeys.map( key => this.find<T>( tableName, searchColumn, key ).pipe( first() ) );
        return concatObservablesToArray( items );
    }

    public getMany<T extends TableData>( tableName: string, keys: string[] ): Observable<T[]>
    {
        const item$s = keys.map( key => this.get<T>( tableName, key ) );
        return concatObservablesToArray( item$s );
    }

    public clone<S extends TableData, T extends TableData>( sourceTableName: string, targetTableName: string, replace?: boolean ): Observable<boolean>
    {
        const sourceCollection = this.getCollection( sourceTableName );
        const targetCollection = this.getCollection( targetTableName );
        return this.list<T>( targetTableName ).pipe(
            map( list => list.length > 0 ),
            switchMap( targetExists => targetExists && !replace
                ? Observable.of( false )
                : this.list<S>( sourceTableName ).pipe(
                    map( sourceList => sourceList.reduce( ( result: WriteBatch, item ) =>
                        result.set( targetCollection.doc<T>( item.key ).ref, item ),
                        this.firestore.firestore.batch() ) ),
                    switchMap( ( batch: WriteBatch ) => Observable.fromPromise( batch.commit() ).pipe(
                        map( () => true ) ) ) ) ) );
    }

    /**
     * Remove view model columns.
     * A column is a view model column if
     *  - it has a counterpart key column
     *  - it ends with $
     * @param item item for which the view model columns are to be removed
     */
    private removeVmColumns<T>( item: T, removeNulls: boolean = false ): Partial<T>
    {
        return filterObject( item, ( value, column, data ) =>
            !( column.endsWith( '$' ) )
            && ( column !== 'key' )
            && ( data[ column + 'Key' ] === undefined )
            && ( data[ column.slice( 0, column.length - 1 ) + 'Keys' ] === undefined )
            && ( removeNulls ? value !== null : true )
        );
    }

    public add<T extends TableData>( tableName: string, item: T ): Observable<string>
    {
        if ( !item ) return Observable.of<string>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<string>( null );

        const promise: Promise<DocumentReference | void> = item.key
            ? collection.doc<T>( item.key ).set( this.removeVmColumns( item ) as T )
            : collection.add( this.removeVmColumns( item ) as T );

        return Observable.fromPromise( promise ).pipe(
            map( docRef => docRef ? docRef.id : item.key ) );
    }

    public addMany<T extends TableData>( tableName: string, items: T[] ): Observable<string[]>
    {
        return concatObservablesToArray( items.map( item => this.add<T>( tableName, item ) ) );
    }

    public updateElseInsertMany<T extends TableData>( tableName: string, items: T[], searchColumn?: keyof T ): Observable<string[]>
    {
        return concatObservablesToArray( items.map( item =>
            this.updateElseInsert( tableName, item, searchColumn, item[ searchColumn ] ) ) );
    }

    public modify<T extends TableData>( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<string>
    {
        if ( !item ) return Observable.of<string>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<string>( null );

        return this.lookup<T>( tableName, searchColumn, searchKey ).pipe(
            switchMap( existingItem => !existingItem
                ? Observable.of<string>( null )
                : Observable.fromPromise( collection.doc( existingItem.key )
                    .set( this.removeVmColumns( item ) ) ).pipe(
                        map( () => existingItem.key ) ) ) );

    }

    public updateElseInsert<T extends TableData>( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<string>
    {
        return this.modify( tableName, item, searchKey, searchColumn ).pipe(
            switchMap( updatedItem => updatedItem
                ? Observable.of( updatedItem )
                : this.add( tableName, item ) ) );
    }

    private validateAndFetchExistingItem<T extends TableData>( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<T>
    {
        /**
         * if no item provided return immediately
         */
        if ( !item ) return Observable.of<T>( null );

        /**
         * Remove view model columns
         */
        item = this.removeVmColumns( item ) as T;

        /**
         * Get existing item
         */
        return this.lookup( tableName, searchColumn, searchKey );
    }

    public modifyFields<T extends TableData>( tableName: string, item: T, searchColumn?: keyof T, searchKey: any = item.key ): Observable<string>
    {
        if ( !item ) return Observable.of<string>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<string>( null );

        return this.lookup<T>( tableName, searchColumn, searchKey ).pipe(
            switchMap( existingItem => !existingItem
                ? Observable.of<string>( null )
                : Observable.fromPromise( collection.doc<T>( existingItem.key ).update( this.removeVmColumns( item, true ) ) ).pipe(
                    map( () => existingItem.key ) ) ) );
    }

    public modifyFieldsMany<T extends TableData>( tableName: string, items: T[], searchColumn?: keyof T ): Observable<string[]>
    {
        if ( !items ) return Observable.of<string[]>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<string[]>( null );

        const existingItemsObservables = items.map( item =>
            this.validateAndFetchExistingItem( tableName, item, searchColumn, item[ searchColumn ] ) );

        return concatObservablesToArray( existingItemsObservables ).pipe(
            map( existingItems => existingItems
                .filter( eItem => !!eItem )
                .map( ( eItem, i ) => items[ i ] ) ),
            map( newList => ( {
                newList: newList,
                batch: newList.map( item => filterOutObjectByValue( item, [ null, undefined ] ) )
                    .reduce( ( batch: WriteBatch, item ) => batch.update( collection.doc( item.key ).ref, item )
                        , this.firestore.firestore.batch() )
            } ) ),
            switchMap( result => Observable.fromPromise( result.batch.commit() ).pipe(
                map( () => result.newList.map( item => item.key ) ) ) ) );
    }

    public remove<T extends TableData>( tableName: string, key: string ): Observable<T>
    {
        if ( !key ) return Observable.of<T>( null );
        const collection = this.getCollection<T>( tableName );
        if ( !collection ) return Observable.of<T>( null );

        /**
         * Get existing item
         * Exit this function if existing item is not found
         */
        return this.lookup<T>( tableName, undefined, key ).pipe(
            switchMap( existingItem => !existingItem
                /* Delete failed since existing item not found. Return 'null' to indicate 'no item deleted' */
                ? Observable.of<T>( null )
                /* Delete succeeded. Return existingItem as itemDeleted */
                : Observable.fromPromise( collection.doc( existingItem.key ).delete() ).pipe(
                    map( () => existingItem ) ) ) );

    }

}
