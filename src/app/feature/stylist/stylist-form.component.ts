import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material';
import { Observable } from 'rxjs';
import { map, first, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Stylist, Service } from '../../shared/model';
import { StylistModuleState, StylistAction } from './stylist.store';

@Component( {
	selector: 'app-stylist-form',
	templateUrl: './stylist-form.component.html',
	styleUrls: [ './stylist-form.component.css' ]
} )
export class StylistFormComponent implements AfterViewInit
{

	public serviceListOpen: boolean;
	public form: FormGroup;
	public formItem: Stylist;
	public creating: boolean;
	public serviceList: Observable<Service[]>;
	public selectedServiceList: Service[];
	@ViewChild( MatSelectionList ) serviceListViewChild: MatSelectionList;

	constructor ( private store: Store<StylistModuleState>, private formBuilder: FormBuilder )
	{

		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.stylistState.formItem ),
			first(),
			withLatestFrom( this.store.pipe( select( state => state.stylistState.creating ) ) ) )
			.subscribe( ( [ formItem, creating ] ) =>
			{
				this.creating = creating;
				this.formItem = formItem;
				this.form = this.formBuilder.group( {
					name: [ this.formItem.name, Validators.required ]
				} );
			} );

		this.serviceList = this.store.pipe(
			select( state => state.stylistState.serviceList ),
			first() );

	}

	public ngAfterViewInit (): void
	{
		console.log( this.serviceListViewChild.options );
		this.serviceList.subscribe( list => this.serviceListViewChild.options
			.filter( item => !!this.formItem.serviceList.find( refItem => item.value.key === refItem.key ) )
			.forEach( item => this.serviceListViewChild.selectedOptions.select( item ) ) );
	}

	public submit (): void
	{
		this.formItem = {
			...this.formItem,
			name: this.form.get( 'name' ).value as string,
			serviceKeyList: this.serviceListViewChild.selectedOptions.selected.map( item => item.value.key as string )
		};

		this.creating
			? this.store.dispatch( new StylistAction.Add( this.formItem ) )
			: this.store.dispatch( new StylistAction.Modify( this.formItem ) );
	}

	public cancel (): void
	{
		this.store.dispatch( new StylistAction.CancelEdit() );
	}

	public serviceListSelectionChange ( selectionList: any ): void
	{
		console.log( selectionList );
	}

}
