import { Observable } from "rxjs";

export function readImage ( file: File ): Observable<HTMLImageElement>
{
	let filePromise = new Promise<HTMLImageElement>( ( resolve, reject ) =>
	{
		let image = new Image();
		image.onload = ( event: any ) => resolve( image );
		image.src = URL.createObjectURL( file );
	} );
	return Observable.fromPromise( filePromise );
}
