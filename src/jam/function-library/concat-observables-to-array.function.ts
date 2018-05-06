import { Observable } from "rxjs";
import { concat, skip, toArray } from "rxjs/operators";

export function concatObservablesToArray<T>( observables: Observable<T>[] ): Observable<T[]>
{
	return Observable.of( null ).pipe(
		concat( ...observables ),
		skip( 1 ),
		toArray()
	);
}
