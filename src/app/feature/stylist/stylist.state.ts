import { AppModuleState } from "../../app.store";
import { Stylist, Service } from "../../shared/model";

export interface StylistModuleState extends AppModuleState
{
	stylistState: StylistState
}

export interface StylistState
{
	list: Stylist[];
	serviceList: Service[];

	processing: boolean;
	loading: boolean;
	creating: boolean;
	editing: boolean;
	formItem: Stylist;
}
