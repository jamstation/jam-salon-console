import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { sortStringList } from "../../../jam/function-library";
import { DatabaseService } from "../../../jam/firestore";
import { ServiceActionTypes, ServiceAction } from "./service.actions";
import { ServiceModuleState } from "./service.state";
import { ServiceFormComponent } from "./service-form.component";
import { Tables, Service } from "../../shared/model";

@Injectable()
export class ServiceEffects
{
	@Effect() public load: Observable<Action>;
	@Effect() public add: Observable<Action>;
	@Effect() public modify: Observable<Action>;
	@Effect() public remove: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog: Observable<any>;

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		this.load = this.actions.pipe(
			ofType<ServiceAction.Load>( ServiceActionTypes.load ),
			switchMap( action => this.db.list<Service>( Tables.Service ) ),
			map( list => sortStringList( list, 'name' ) ),
			map( list => new ServiceAction.Loaded( list ) )
		);

		this.add = this.actions.pipe(
			ofType<ServiceAction.Add>( ServiceActionTypes.add ),
			switchMap( action => this.db.add<Service>( Tables.Service, action.item ) ),
			map( item => item
				? new ServiceAction.Added( item )
				: new ServiceAction.AddFailed() )
		);

		this.modify = this.actions.pipe(
			ofType<ServiceAction.Modify>( ServiceActionTypes.modify ),
			switchMap( action => this.db.modify<Service>( Tables.Service, action.item ) ),
			map( item => item
				? new ServiceAction.Modified( item )
				: new ServiceAction.ModifyFailed() )
		);

		this.remove = this.actions.pipe(
			ofType<ServiceAction.Remove>( ServiceActionTypes.remove ),
			switchMap( action => this.db.remove<Service>( Tables.Service, action.item.key ) ),
			map( item => item
				? new ServiceAction.Removed( item )
				: new ServiceAction.RemoveFailed() )
		);

		this.openDialog = this.actions.pipe(
			ofType<ServiceAction.Edit>( ServiceActionTypes.create, ServiceActionTypes.edit ),
			map( action => this.dialogManager.open( ServiceFormComponent, { width: '400px', id: 'ServiceFormComponent' } ) )
		);

		this.closeDialog = this.actions.pipe(
			ofType( ServiceActionTypes.cancelCreate, ServiceActionTypes.cancelEdit, ServiceActionTypes.add, ServiceActionTypes.modify ),
			map( action => this.dialogManager.getDialogById( 'ServiceFormComponent' ).close() )
		);

	}
}
