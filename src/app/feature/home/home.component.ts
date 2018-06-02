import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first, share } from 'rxjs/operators';
import { ScreenSizes, MatGridData, Company } from '../../../jam/model-library';
import { User, AuthAction } from '../../../jam/auth';
import { DatabaseAction } from '../../../jam/firestore';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages } from '../../shared/model';
import { HomeModuleState } from './home.store';
import { HomeAction } from './home.actions';

@Component( {
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
} )
export class HomeComponent
{

	public pages = Pages;
	public user: Observable<User>;
	public company: Observable<Company>;
	public features: { title: string, description: string }[];

	constructor ( private store: Store<HomeModuleState> )
	{
		this.user = this.store.pipe( select( state => state.authState.user ), share() );
		this.company = this.store.pipe( select( state => state.homeState.company ) );
		this.store.dispatch( new HomeAction.Load() );

		this.features = [
			{ title: 'Schedule Appointments', description: 'Jamsalon is a powerful software that can handle all your salon appointment bookings. Features include online booking, pos with payments and mobile apps.' },
			{ title: 'Manage your clients', description: 'Maintain client relationships with advanced salon software management features with detailed client appointments history, booking preferences, future bookings and contact details.' },
			{ title: 'Reduce No-Shows', description: 'Send automated reminders and custom messages to clients about appointments and notify them of any changes. Shedul Scheduling app is the best software for Salons and Spas.' },
			{ title: 'Activity Dashboard', description: 'Keep track of daily appoitment scheduling activities and never miss a beat. The free dashboard displays up to date appointment bookings, online bookings, appointment cancelations and client notifications.' }
		]
	}

	public create (): void
	{
		this.store.dispatch( new HomeAction.Create() );
	}

	public goto ( page: Pages )
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

	public signOut (): void
	{
		this.store.dispatch( new AuthAction.SignOut() );
	}

}
