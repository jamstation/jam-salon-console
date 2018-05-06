import { Routes } from '@angular/router';
import { DatabaseGuard } from '../jam/firestore';
import { AuthGuard, SignInComponent, RegisterComponent } from '../jam/auth';
import { UserGuard } from '../jam/auth/user.guard';
import { ErrorPageComponent } from './shared/error-page';

export const routes: Routes = [

	{ path: '', loadChildren: './feature/home/home.module#HomeModule', canLoad: [ DatabaseGuard ] },
	{ path: 'console/:company', loadChildren: './feature/console/console.module#ConsoleModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard, UserGuard ] },

	{ path: 'sign-in', component: SignInComponent, canActivate: [ DatabaseGuard ] },
	{ path: 'register', component: RegisterComponent, canActivate: [ DatabaseGuard ] },

	{ path: 'error', component: ErrorPageComponent },

	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' }

];
