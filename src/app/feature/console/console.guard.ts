import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, first, tap, withLatestFrom } from 'rxjs/operators';
import { UserApp, Company } from '../../../jam/model-library';
import { DatabaseAction, DatabaseService } from '../../../jam/firestore';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages, Tables } from '../../shared/model';
import { ConsoleModuleState, ConsoleAction } from './console.store';
import { app } from '../../../environments/environment';

@Injectable()
export class ConsoleGuard implements Resolve<Observable<Company>>
{

	constructor ( private store: Store<ConsoleModuleState>, private db: DatabaseService ) { }

	resolve ( activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot ): Observable<Company>
	{
		const companyKey: string = activatedRouteSnapshot.params[ 'company' ] || '';

		return this.db.lookup<UserApp>( Tables.UserApp, undefined, app.name ).pipe(
			map( userApp => userApp.role == 'owner' ),
			tap( hasAccess =>
			{
				console.info( '[ConsoleGuard]', 'Has Access?', hasAccess );
				if ( hasAccess ) {
					this.store.dispatch( new DatabaseAction.EnterCollection( 'Company', companyKey ) );
					// this.store.dispatch( new CompanyAction.Select( company ) );
				} else {
					this.store.dispatch( new NavigatorAction.Navigate( Pages.errorPage ) );
				}
			} ),
			filter( hasAccess => hasAccess ),
			withLatestFrom( this.db.get<Company>( Tables.Company, companyKey ) ),
			map( ( [ hasAccess, company ] ) => company ),
			tap( company => this.store.dispatch( new ConsoleAction.LoadCompany( company ) ) )
		)
	}

}
