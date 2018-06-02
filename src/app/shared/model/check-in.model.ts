import { TableData } from "../../../jam/model-library";
import { Service } from './service.model';
import { Stylist } from './stylist.model';

export interface CheckIn extends TableData
{
	token: string;
	time: Date;
	name?: string;
	phone?: string;
	serviceKeyList?: string[];
	stylistKey?: string;
	serviceList?: Service[];
	stylist?: Stylist;
}
