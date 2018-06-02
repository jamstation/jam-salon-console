// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false
};

export const database = {

	firebaseAppConfig: {
		apiKey: "AIzaSyDbmFGvZ6mImguM855TORlsk-J9aHmWYi0",
		authDomain: "jam-station.firebaseapp.com",
		databaseURL: "https://jam-station.firebaseio.com",
		projectId: "jam-station",
		storageBucket: "jam-station.appspot.com",
		messagingSenderId: "921915420874"
	},

	config: {
		metadataPath: '/App/jam-salon/Metadata/database'
	}

}

export const storeDevtoolsConfig = {
	name: 'Jam Salon',
	maxAge: 25,
	logOnly: true,
	// serialize: true
};

export const app = {
	name: 'jam-salon'
}

export const notificationConfig = {
	defaultMessage: {
		content: 'Done',
		action: 'Ok',
		duration: 3000,
	},
	horizontalPosition: "center",
	verticalPosition: "bottom"
}
