import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect, MatOption } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { Company } from '../../../jam/model-library';
import { HomeModuleState, HomeAction } from './home.store';

@Component( {
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrls: [ './company-form.component.css' ]
} )
export class CompanyFormComponent
{

	public form: FormGroup;
	public formItem: Company;
	public subscriptions: Observable<string[]>;

	constructor ( private store: Store<HomeModuleState>, private formBuilder: FormBuilder )
	{
		this.formItem = {
			key: null,
			name: null,
			subscription: null
		}

		this.form = this.formBuilder.group( {
			name: [ this.formItem.name, Validators.required ]
		} );

	}

	public submit (): void
	{
		this.formItem.name = this.form.get( 'name' ).value;
		this.store.dispatch( new HomeAction.Add( this.formItem ) );
	}

	public cancel (): void
	{
		this.store.dispatch( new HomeAction.CancelCreate() );
	}

}
