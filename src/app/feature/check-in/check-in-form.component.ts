import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, first, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CheckIn, Service, Stylist } from '../../shared/model';
import { CheckInModuleState, CheckInAction } from './check-in.store';

@Component( {
	selector: 'app-check-in-form',
	templateUrl: './check-in-form.component.html',
	styleUrls: [ './check-in-form.component.css' ]
} )
export class CheckInFormComponent
{

	public serviceListOpen: boolean;
	public form: FormGroup;
	public formItem: CheckIn;
	public creating: boolean;
	public serviceList: Observable<Service[]>;
	public stylistList: Observable<Stylist[]>;

	constructor ( private store: Store<CheckInModuleState>, private formBuilder: FormBuilder )
	{

		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.checkInState.formItem ),
			first(),
			withLatestFrom( this.store.pipe( select( state => state.checkInState.creating ) ) ) )
			.subscribe( ( [ formItem, creating ] ) =>
			{
				this.creating = creating;
				this.formItem = formItem;
				this.form = this.formBuilder.group( {
					name: [ this.formItem.name ],
					phone: [ this.formItem.phone ]
				} );
			} );

		this.serviceList = this.store.pipe(
			select( state => state.checkInState.serviceList ),
			first() );

		this.stylistList = this.store.pipe(
			select( state => state.checkInState.stylistList ),
			first() );

	}

	public submit (): void
	{
		this.formItem = {
			...this.formItem,
			name: this.form.get( 'name' ).value,
			phone: this.form.get( 'phone' ).value
		};
		this.creating
			? this.store.dispatch( new CheckInAction.Add( this.formItem ) )
			: this.store.dispatch( new CheckInAction.Modify( this.formItem ) )
	}

	public cancel (): void
	{
		this.store.dispatch( new CheckInAction.CancelEdit() );
	}

}
