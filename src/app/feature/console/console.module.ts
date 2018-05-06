import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ToolbarModule } from '../../shared/layout';

import { ConsoleGuard } from './console.guard';
import { routes } from './console.routes';
import { ConsoleReducer, ConsoleEffects } from './console.store';
import { ConsoleComponent } from './console.component';

@NgModule( {
	declarations: [ ConsoleComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'companyState', ConsoleReducer ),
		EffectsModule.forFeature( [ ConsoleEffects ] ),
		ToolbarModule
	],
	providers: [ ConsoleGuard ]
} )
export class ConsoleModule { }
