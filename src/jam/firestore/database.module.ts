import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { AngularFireModule, FirebaseAppConfig, FirebaseAppName } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { FirebaseOptions } from '@firebase/app-types';
import { DatabaseGuard } from './database.guard';
import { DatabaseService } from './database.service';

@NgModule( {
    imports: [ AngularFireModule, AngularFirestoreModule ],
    providers: [ DatabaseGuard ]
} )
export class JamFirestoreModule
{
    static forRoot ( config: FirebaseOptions, enablePersistence: boolean = false, appName?: string ): ModuleWithProviders
    {
        AngularFireModule.initializeApp( config );

        if ( enablePersistence ) {
            AngularFirestoreModule.enablePersistence();
        }

        return {
            ngModule: JamFirestoreModule,
            providers: [
                DatabaseGuard,
                DatabaseService,
                { provide: FirebaseAppConfig, useValue: config },
                { provide: FirebaseAppName, useValue: appName }
            ],
        };
    }
}
