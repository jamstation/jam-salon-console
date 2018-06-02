import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CheckIn } from '../../shared/model';
import { CheckInModuleState, CheckInAction } from './check-in.store';

@Component( {
	selector: 'app-check-in',
	templateUrl: './check-in.component.html',
	styleUrls: [ './check-in.component.css' ]
} )
export class CheckInComponent
{

	public list: Observable<CheckIn[]>;

	constructor ( private store: Store<CheckInModuleState> )
	{

		/**
		 * Store Selects
		 */
		this.list = this.store.pipe( select( state => state.checkInState.list ) );

		/**
		 * Store Dispatches
		 */
		this.store.dispatch( new CheckInAction.Load() );
		this.store.dispatch( new CheckInAction.LoadServiceList() );
		this.store.dispatch( new CheckInAction.LoadStylistList() );
	}

	public create (): void
	{
		this.store.dispatch( new CheckInAction.Create() );
	}

	public edit ( checkIn: CheckIn ): void
	{
		this.store.dispatch( new CheckInAction.Edit( checkIn ) );
	}

	public remove ( checkIn: CheckIn ): void
	{
		this.store.dispatch( new CheckInAction.Remove( checkIn ) );
	}

}
