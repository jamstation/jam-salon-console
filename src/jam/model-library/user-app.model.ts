import { TableData } from './table-data.model';
import { UserRoles } from './user-role.enum';
import { KeyValue } from './key-value.model';
import { FirestoreAccess } from './firestore-access.model';

export interface UserApp extends TableData
{
	companyKey: string;
	role: UserRoles;
	accesses?: KeyValue<FirestoreAccess>;
}
