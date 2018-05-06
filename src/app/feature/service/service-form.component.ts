import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, first, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Service } from '../../shared/model';
import { ServiceModuleState, ServiceAction } from './service.store';

@Component( {
	selector: 'app-service-form',
	templateUrl: './service-form.component.html',
	styleUrls: [ './service-form.component.css' ]
} )
export class ServiceFormComponent
{

	public form: FormGroup;
	public formItem: Service;
	public creating: boolean;

	constructor ( private store: Store<ServiceModuleState>, private formBuilder: FormBuilder )
	{

		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.serviceState.formItem ),
			first(),
			withLatestFrom( this.store.pipe( select( state => state.serviceState.creating ) ) ) )
			.subscribe( ( [ formItem, creating ] ) =>
			{
				this.creating = creating;
				this.formItem = formItem;
				this.form = this.formBuilder.group( {
					name: [ this.formItem.name ],
				} );
			} )

	}

	public submit (): void
	{
		this.formItem = {
			...this.formItem,
			name: this.form.get( 'name' ).value
		};
		this.creating
			? this.store.dispatch( new ServiceAction.Add( this.formItem ) )
			: this.store.dispatch( new ServiceAction.Modify( this.formItem ) )
	}

	public cancel (): void
	{
		this.store.dispatch( new ServiceAction.CancelEdit() );
	}

}
