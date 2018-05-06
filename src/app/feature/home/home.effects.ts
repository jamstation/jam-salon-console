import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap, tap, withLatestFrom, filter, first, concatMap } from "rxjs/operators";
import { KeyValue, UserRoles, UserApp, Company } from "../../../jam/model-library";
import { DatabaseService, DatabaseAction } from "../../../jam/firestore";
import { NotificationAction } from "../../../jam/notification";
import { HomeModuleState } from "./home.state";
import { HomeActionTypes, HomeAction } from "./home.actions";
import { Tables } from "../../shared/model";
import { CompanyFormComponent } from "./company-form.component";
import { app } from "../../../environments/environment";

@Injectable()
export class HomeEffects
{

	constructor (
		private actions: Actions,
		private store: Store<HomeModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	) { console.log( 'home effects' ) }

	@Effect() public load = this.actions.pipe(
		ofType<HomeAction.Load>( HomeActionTypes.load ),
		switchMap( action => this.db.get<UserApp>( Tables.UserApp, app.name ) ),
		map( item => item
			? new HomeAction.LoadSuccess( item )
			: new HomeAction.LoadFailed() ) );

	@Effect() public loadSuccess = this.actions.pipe(
		ofType<HomeAction.LoadSuccess>( HomeActionTypes.loadSuccess ),
		map( action => new DatabaseAction.EnterCollection( 'Company', action.item.companyKey ) ) );

	@Effect() public add = this.actions.pipe(
		ofType<HomeAction.Add>( HomeActionTypes.add ),
		switchMap( action => this.db.exists<Company>( Tables.Company, action.item.key ).pipe(
			switchMap( companyExists => !companyExists
				? this.db.add<Company>( Tables.Company, action.item ).pipe(
					concatMap( company => company
						? this.db.add<UserApp>( Tables.UserApp, { key: app.name, companyKey: action.item.key, role: UserRoles.owner } )
						: Observable.of<string>( null ) ) )
				: Observable.of<string>( null ) ) ) ),
		map( key => key
			? new HomeAction.AddSuccess( key )
			: new HomeAction.AddFailed() ) );

	@Effect() public added = this.actions.pipe(
		ofType<HomeAction.AddSuccess>( HomeActionTypes.addSuccess ),
		map( message => new NotificationAction.Open( 'Company Created' ) ) );

	@Effect() public addFailed = this.actions.pipe(
		ofType<HomeAction.AddFailed>( HomeActionTypes.addFailed ),
		map( message => new NotificationAction.Open( 'Error Creating Company' ) ) );

	@Effect( { dispatch: false } ) public openDialog = this.actions.pipe(
		ofType( HomeActionTypes.create ),
		map( action => this.dialogManager.open( CompanyFormComponent, { width: '600px', id: 'CompanyFormComponent' } ) ) );

	@Effect( { dispatch: false } ) public closeDialog = this.actions.pipe(
		ofType( HomeActionTypes.cancelCreate, HomeActionTypes.addSuccess, HomeActionTypes.addFailed ),
		map( action => this.dialogManager.getDialogById( 'CompanyFormComponent' ).close() ) );

}
