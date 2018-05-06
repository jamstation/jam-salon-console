import { TableData } from "./table-data.model";

export interface Company extends TableData
{
	name: string;
	userKey: string;
	subscription: string;
}
