import { Company } from "../../../jam/model-library";
import { AppModuleState } from "../../app.store";

export interface ConsoleModuleState extends AppModuleState
{
	consoleState: ConsoleState
}

export interface ConsoleState
{
	company: Company;
}
