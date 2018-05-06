import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ScreenSizes } from '../../../../jam/model-library';
import { User, AuthAction } from '../../../../jam/auth';
import { AppModuleState } from '../../../app.store';
import { LayoutAction } from '../layout.actions';
import { Pages } from '../../model';

@Component( {
	selector: 'app-layout-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: [ './toolbar.component.css' ]
} )
export class ToolbarComponent
{

	public toolbarOpen: boolean;
	public screenSize: Observable<ScreenSizes>;
	public companyTitle: Observable<string>;
	public user: Observable<User>;
	public pages = Pages;

	constructor ( private store: Store<AppModuleState> )
	{
		this.screenSize = this.store.pipe( select( state => state.jamLayoutState.screenSize ) );
		this.companyTitle = Observable.of( 'Jam Salon Console' );
		this.user = this.store.pipe( select( state => state.authState.user ) );
	}

	public goto ( page: Pages ): void
	{
		const navItem = { text: '', link: page };
		this.store.dispatch( new LayoutAction.SelectNavItem( navItem ) );
	}

}
