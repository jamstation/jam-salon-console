import { Routes } from '@angular/router';
import { ConsoleComponent } from './console.component';
import { ConsoleGuard } from './console.guard';

export const routes: Routes = [
	{
		path: '', component: ConsoleComponent, canActivate: [ ConsoleGuard ], children: [
			// { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
			// { path: 'settings', loadChildren: '../settings/settings.module#SettingsModule' },
			{ path: 'queue', loadChildren: '../check-in/check-in.module#CheckInModule' },
			{ path: 'services', loadChildren: '../service/service.module#ServiceModule' },
			{ path: 'stylists', loadChildren: '../stylist/stylist.module#StylistModule' },
		]
	}
];
