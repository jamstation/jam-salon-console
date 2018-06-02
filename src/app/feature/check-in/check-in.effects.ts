import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { sortStringList } from "../../../jam/function-library";
import { DatabaseService } from "../../../jam/firestore";
import { CheckInActionTypes, CheckInAction } from "./check-in.actions";
import { CheckInModuleState } from "./check-in.state";
import { CheckInFormComponent } from "./check-in-form.component";
import { Tables, CheckIn, Service, Stylist } from "../../shared/model";

@Injectable()
export class CheckInEffects
{

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	) { }

	@Effect() public load = this.actions.pipe(
		ofType<CheckInAction.Load>( CheckInActionTypes.load ),
		switchMap( action => this.db.list<CheckIn>( Tables.CheckIn ) ),
		map( list => sortStringList( list, 'token' ) ),
		map( list => new CheckInAction.LoadSuccess( list ) ) );

	@Effect() public loadServiceList = this.actions.pipe(
		ofType<CheckInAction.LoadServiceList>( CheckInActionTypes.loadServiceList ),
		switchMap( action => this.db.list<Service>( Tables.Service ) ),
		map( list => sortStringList( list, 'name' ) ),
		map( list => new CheckInAction.LoadServiceListSuccess( list ) ) );

	@Effect() public loadStylistList = this.actions.pipe(
		ofType<CheckInAction.LoadStylistList>( CheckInActionTypes.loadStylistList ),
		switchMap( action => this.db.list<Stylist>( Tables.Stylist ) ),
		map( list => sortStringList( list, 'name' ) ),
		map( list => new CheckInAction.LoadStylistListSuccess( list ) ) );

	@Effect() public add = this.actions.pipe(
		ofType<CheckInAction.Add>( CheckInActionTypes.add ),
		switchMap( action => this.db.add<CheckIn>( Tables.CheckIn, action.item ) ),
		map( item => item
			? new CheckInAction.AddSuccess( item )
			: new CheckInAction.AddFailed() ) );

	@Effect() public modify = this.actions.pipe(
		ofType<CheckInAction.Modify>( CheckInActionTypes.modify ),
		switchMap( action => this.db.modify<CheckIn>( Tables.CheckIn, action.item ) ),
		map( item => item
			? new CheckInAction.ModifySuccess( item )
			: new CheckInAction.ModifyFailed() ) );

	@Effect() public remove = this.actions.pipe(
		ofType<CheckInAction.Remove>( CheckInActionTypes.remove ),
		switchMap( action => this.db.remove<CheckIn>( Tables.CheckIn, action.item.key ) ),
		map( item => item
			? new CheckInAction.RemoveSuccess( item )
			: new CheckInAction.RemoveFailed() ) );

	@Effect( { dispatch: false } ) public openDialog = this.actions.pipe(
		ofType<CheckInAction.Edit>( CheckInActionTypes.create, CheckInActionTypes.edit ),
		map( action => this.dialogManager.open( CheckInFormComponent, { width: '800px', id: 'CheckInFormComponent' } ) ) );

	@Effect( { dispatch: false } ) public closeDialog = this.actions.pipe(
		ofType( CheckInActionTypes.cancelEdit, CheckInActionTypes.add, CheckInActionTypes.modify ),
		map( action => this.dialogManager.getDialogById( 'CheckInFormComponent' ).close() ) );

}
