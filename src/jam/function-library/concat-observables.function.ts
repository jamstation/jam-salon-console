import { Observable } from "rxjs";
import { concat, skip } from "rxjs/operators";

export function concatObservables<T>( observables: Observable<T>[] ): Observable<T>
{
	return Observable.of( null ).pipe(
		concat( ...observables ),
		skip( 1 )
	);
}
