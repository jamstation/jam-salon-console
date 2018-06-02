import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Stylist } from '../../shared/model';
import { StylistModuleState, StylistAction } from './stylist.store';

@Component( {
	selector: 'app-stylist',
	templateUrl: './stylist.component.html',
	styleUrls: [ './stylist.component.css' ]
} )
export class StylistComponent
{

	public list: Observable<Stylist[]>;

	constructor ( private store: Store<StylistModuleState> )
	{

		/**
		 * Store Selects
		 */
		this.list = this.store.pipe( select( state => state.stylistState.list ) );

		/**
		 * Store Dispatches
		 */
		this.store.dispatch( new StylistAction.Load() );
	}

	public create (): void
	{
		this.store.dispatch( new StylistAction.Create() );
	}

	public edit ( stylist: Stylist ): void
	{
		this.store.dispatch( new StylistAction.Edit( stylist ) );
	}

	public remove ( stylist: Stylist ): void
	{
		this.store.dispatch( new StylistAction.Remove( stylist ) );
	}

}
