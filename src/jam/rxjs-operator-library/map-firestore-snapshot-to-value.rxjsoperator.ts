import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DocumentChangeAction, Action } from "angularfire2/firestore";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { TableData } from "../model-library";

export const mapFirestoreSnapshotToValue = <T extends TableData>() => ( source: Observable<Action<DocumentSnapshot>> ) =>
{
	return source.pipe(
		map( action => action.payload.exists ? ( { key: action.payload.id, ...action.payload.data() } ) as T : null )
	);
}
