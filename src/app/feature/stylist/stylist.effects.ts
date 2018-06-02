import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { sortStringList } from "../../../jam/function-library";
import { DatabaseService } from "../../../jam/firestore";
import { StylistActionTypes, StylistAction } from "./stylist.actions";
import { StylistModuleState } from "./stylist.state";
import { StylistFormComponent } from "./stylist-form.component";
import { Tables, Stylist, Service } from "../../shared/model";

@Injectable()
export class StylistEffects
{

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	) { }

	@Effect() public load = this.actions.pipe(
		ofType<StylistAction.Load>( StylistActionTypes.load ),
		switchMap( action => this.db.list<Stylist>( Tables.Stylist ).pipe(
			switchMap( list => this.db.list<Service>( Tables.Service ).pipe(
				map( serviceList => ( {
					list: list.map( item => ( {
						...item,
						serviceList: item.serviceKeyList.map( key => serviceList.find( refItem => refItem.key === key ) || null )
					} ) ) as Stylist[],
					serviceList: serviceList
				} ) ) ) ) ) ),
		map( ( { list, serviceList } ) => ( {
			list: sortStringList( list, 'name' ),
			serviceList: sortStringList( serviceList, 'name' )
		} ) ),
		map( ( { list, serviceList } ) => new StylistAction.LoadSuccess( list, serviceList ) ) );

	@Effect() public add = this.actions.pipe(
		ofType<StylistAction.Add>( StylistActionTypes.add ),
		switchMap( action => this.db.add<Stylist>( Tables.Stylist, action.item ) ),
		map( item => item
			? new StylistAction.AddSuccess( item )
			: new StylistAction.AddFailed() ) );

	@Effect() public modify = this.actions.pipe(
		ofType<StylistAction.Modify>( StylistActionTypes.modify ),
		switchMap( action => this.db.modify<Stylist>( Tables.Stylist, action.item ) ),
		map( item => item
			? new StylistAction.ModifySuccess( item )
			: new StylistAction.ModifyFailed() ) );

	@Effect() public remove = this.actions.pipe(
		ofType<StylistAction.Remove>( StylistActionTypes.remove ),
		switchMap( action => this.db.remove<Stylist>( Tables.Stylist, action.item.key ) ),
		map( item => item
			? new StylistAction.RemoveSuccess( item )
			: new StylistAction.RemoveFailed() ) );

	@Effect( { dispatch: false } ) public openDialog = this.actions.pipe(
		ofType<StylistAction.Edit>( StylistActionTypes.create, StylistActionTypes.edit ),
		map( action => this.dialogManager.open( StylistFormComponent, { width: '800px', id: 'StylistFormComponent' } ) ) );

	@Effect( { dispatch: false } ) public closeDialog = this.actions.pipe(
		ofType( StylistActionTypes.cancelCreate, StylistActionTypes.cancelEdit, StylistActionTypes.add, StylistActionTypes.modify ),
		map( action => this.dialogManager.getDialogById( 'StylistFormComponent' ).close() ) );

}
