import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AngularFireUploadTask } from "angularfire2/storage";
import { UploadStatuses } from "../model-library";

export interface JamFirestoreUploadTask extends AngularFireUploadTask
{
	status?: BehaviorSubject<UploadStatuses>;
	error?: BehaviorSubject<Error>,
}
