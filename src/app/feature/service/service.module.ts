import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import
{
	MatListModule,
	MatButtonModule,
	MatIconModule,
	MatInputModule,
	MatDialogModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JamWindowModule } from '../../../jam/ui-library';

import { routes } from './service.routes';
import { ServiceReducer } from './service.reducer';
import { ServiceEffects } from './service.effects';
import { ServiceComponent } from './service.component';
import { ServiceFormComponent } from './service-form.component';

@NgModule( {
	declarations: [ ServiceComponent, ServiceFormComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatDialogModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'serviceState', ServiceReducer ),
		EffectsModule.forFeature( [ ServiceEffects ] ),
		JamWindowModule
	],
	entryComponents: [ ServiceFormComponent ]
} )
export class ServiceModule { }
