import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Service } from '../../shared/model';
import { ServiceModuleState, ServiceAction } from './service.store';
import { Subscription } from 'rxjs/Subscription';

@Component( {
	selector: 'app-service',
	templateUrl: './service.component.html',
	styleUrls: [ './service.component.css' ]
} )
export class ServiceComponent
{

	public list: Observable<Service[]>;

	constructor ( private store: Store<ServiceModuleState> )
	{

		/**
		 * Store Selects
		 */
		this.list = this.store.pipe( select( state => state.serviceState.list ) );

		/**
		 * Store Dispatches
		 */
		this.store.dispatch( new ServiceAction.Load() );
	}

	public create (): void
	{
		this.store.dispatch( new ServiceAction.Create() );
	}

	public edit ( service: Service ): void
	{
		this.store.dispatch( new ServiceAction.Edit( service ) );
	}

	public remove ( service: Service ): void
	{
		this.store.dispatch( new ServiceAction.Remove( service ) );
	}

}
