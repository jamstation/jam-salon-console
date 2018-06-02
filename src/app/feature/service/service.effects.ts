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

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	) { }

	@Effect() public load = this.actions.pipe(
		ofType<ServiceAction.Load>( ServiceActionTypes.load ),
		switchMap( action => this.db.list<Service>( Tables.Service ) ),
		map( list => sortStringList( list, 'name' ) ),
		map( list => new ServiceAction.Loaded( list ) )
	);

	@Effect() public add = this.actions.pipe(
		ofType<ServiceAction.Add>( ServiceActionTypes.add ),
		switchMap( action => this.db.add<Service>( Tables.Service, action.item ) ),
		map( item => item
			? new ServiceAction.Added( item )
			: new ServiceAction.AddFailed() )
	);

	@Effect() public modify = this.actions.pipe(
		ofType<ServiceAction.Modify>( ServiceActionTypes.modify ),
		switchMap( action => this.db.modify<Service>( Tables.Service, action.item ) ),
		map( item => item
			? new ServiceAction.Modified( item )
			: new ServiceAction.ModifyFailed() )
	);

	@Effect() public remove = this.actions.pipe(
		ofType<ServiceAction.Remove>( ServiceActionTypes.remove ),
		switchMap( action => this.db.remove<Service>( Tables.Service, action.item.key ) ),
		map( item => item
			? new ServiceAction.Removed( item )
			: new ServiceAction.RemoveFailed() )
	);

	@Effect( { dispatch: false } ) public openDialog = this.actions.pipe(
		ofType<ServiceAction.Edit>( ServiceActionTypes.create, ServiceActionTypes.edit ),
		map( action => this.dialogManager.open( ServiceFormComponent, { width: '800px', id: 'ServiceFormComponent' } ) )
	);

	@Effect( { dispatch: false } ) public closeDialog = this.actions.pipe(
		ofType( ServiceActionTypes.cancelCreate, ServiceActionTypes.cancelEdit, ServiceActionTypes.add, ServiceActionTypes.modify ),
		map( action => this.dialogManager.getDialogById( 'ServiceFormComponent' ).close() )
	);

}
