import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, CanLoad, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first, tap, switchMap } from 'rxjs/operators';
import { UserCompany } from '../../../jam/model-library';
import { DatabaseAction, DatabaseService } from '../../../jam/firestore';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages, Tables } from '../../shared/model';
import { ConsoleModuleState, ConsoleAction } from './console.store';

@Injectable()
export class ConsoleGuard implements CanActivate
{

	constructor ( private store: Store<ConsoleModuleState>, private db: DatabaseService ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		return this.store.pipe(
			select( state => state.authState.user ),
			first(),
			switchMap( user => this.db.exists<UserCompany>( Tables.UserCompany, user.key ) ),
			tap( hasAccess =>
			{
				console.info( '[ConsoleGuard]', 'Has Access?', hasAccess );
				if ( !hasAccess ) {
					this.store.dispatch( new NavigatorAction.Navigate( Pages.home ) );
				}
			} )
		)
	}

}
