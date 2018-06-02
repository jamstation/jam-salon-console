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
	MatDialogModule,
	MatExpansionModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JamWindowModule } from '../../../jam/ui-library';

import { routes } from './stylist.routes';
import { StylistReducer } from './stylist.reducer';
import { StylistEffects } from './stylist.effects';
import { StylistComponent } from './stylist.component';
import { StylistFormComponent } from './stylist-form.component';

@NgModule( {
	declarations: [ StylistComponent, StylistFormComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatDialogModule,
		MatExpansionModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'stylistState', StylistReducer ),
		EffectsModule.forFeature( [ StylistEffects ] ),
		JamWindowModule
	],
	entryComponents: [ StylistFormComponent ]
} )
export class StylistModule { }
