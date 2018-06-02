import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, tap, withLatestFrom, filter, first, concatMap, catchError } from "rxjs/operators";
import { KeyValue, UserRoles, UserCompany, Company } from "../../../jam/model-library";
import { DatabaseService, DatabaseAction } from "../../../jam/firestore";
import { NotificationAction } from "../../../jam/notification";
import { HomeModuleState } from "./home.state";
import { HomeActionTypes, HomeAction } from "./home.actions";
import { Tables, Pages } from "../../shared/model";
import { CompanyFormComponent } from "./company-form.component";
import { app } from "../../../environments/environment";
import { FirestoreError } from "@firebase/firestore-types";
import { NavigatorAction } from "../../../jam/navigator";

@Injectable()
export class HomeEffects
{

	constructor (
		private actions: Actions,
		private store: Store<HomeModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	) { }

	@Effect() public load = this.actions.pipe(
		ofType<HomeAction.Load>( HomeActionTypes.load ),
		switchMap( action => this.store.pipe(
			select( state => state.authState.user ),
			filter( user => !!user ),
			first() ) ),
		switchMap( user => this.db.get<Company>( Tables.Company, user.key ).pipe(
			map( item => new HomeAction.LoadSuccess( item ) ),
			catchError( ( error: FirestoreError ) => of( new HomeAction.LoadFailed( error ) ) )
		) ) );

	@Effect() public add = this.actions.pipe(
		ofType<HomeAction.Add>( HomeActionTypes.add ),
		switchMap( action => this.db.exists<Company>( Tables.Company, action.item.key ).pipe(
			withLatestFrom( this.store.pipe( select( state => state.authState.user ) ) ),
			switchMap( ( [ companyExists, user ] ) => !companyExists
				? this.db.add<UserCompany>( Tables.UserCompany, { key: user.key, role: UserRoles.owner } ).pipe(
					concatMap( company => company
						? this.db.add<Company>( Tables.Company, { ...action.item, key: user.key } )
						: of<string>( null ) ) )
				: of<string>( null ) ) ) ),
		map( key => key
			? new HomeAction.AddSuccess( key )
			: new HomeAction.AddFailed() ) );

	@Effect() public addSuccess = this.actions.pipe(
		ofType<HomeAction.AddSuccess>( HomeActionTypes.addSuccess ),
		concatMap( action => [
			new NotificationAction.Open( 'Company Created' ),
			new NavigatorAction.Navigate( Pages.dashboard ),
			new HomeAction.Load() ] ) );

	@Effect() public addFailedMessage = this.actions.pipe(
		ofType<HomeAction.AddFailed>( HomeActionTypes.addFailed ),
		map( action => new NotificationAction.Open( 'Error Creating Company' ) ) );

	@Effect( { dispatch: false } ) public openDialog = this.actions.pipe(
		ofType( HomeActionTypes.create ),
		map( action => this.dialogManager.open( CompanyFormComponent, { width: '600px', id: 'CompanyFormComponent' } ) ) );

	@Effect( { dispatch: false } ) public closeDialog = this.actions.pipe(
		ofType( HomeActionTypes.cancelCreate, HomeActionTypes.addSuccess, HomeActionTypes.addFailed ),
		map( action => this.dialogManager.getDialogById( 'CompanyFormComponent' ).close() ) );

}
