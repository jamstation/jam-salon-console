import { AppModuleState } from "../../app.store";
import { Service } from "../../shared/model";

export interface ServiceModuleState extends AppModuleState
{
	serviceState: ServiceState
}

export interface ServiceState
{
	list: Service[];

	processing: boolean;
	loading: boolean;
	creating: boolean;
	editing: boolean;
	formItem: Service;
}
