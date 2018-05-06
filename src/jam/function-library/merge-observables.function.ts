import { Observable } from "rxjs";
import { merge, skip } from "rxjs/operators";

export function mergeObservables<T>( observables: Observable<T>[] ): Observable<T>
{
	return Observable.of( null ).pipe(
		merge( ...observables ),
		skip( 1 )
	);
}
