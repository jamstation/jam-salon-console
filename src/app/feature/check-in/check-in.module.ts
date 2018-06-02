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
	MatSelectModule,
	MatDialogModule,
	MatExpansionModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JamWindowModule } from '../../../jam/ui-library';

import { routes } from './check-in.routes';
import { CheckInReducer } from './check-in.reducer';
import { CheckInEffects } from './check-in.effects';
import { CheckInComponent } from './check-in.component';
import { CheckInFormComponent } from './check-in-form.component';

@NgModule( {
	declarations: [ CheckInComponent, CheckInFormComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatListModule,
		MatDialogModule,
		MatExpansionModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'checkInState', CheckInReducer ),
		EffectsModule.forFeature( [ CheckInEffects ] ),
		JamWindowModule
	],
	entryComponents: [ CheckInFormComponent ]
} )
export class CheckInModule { }
