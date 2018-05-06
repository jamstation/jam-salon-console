import { Action } from '@ngrx/store';
import { Company } from '../../../jam/model-library';

export const enum ConsoleActionTypes
{
	loadCompany = '[Console] loadCompany',
}

export namespace ConsoleAction
{

	export class LoadCompany implements Action
	{
		public readonly type = ConsoleActionTypes.loadCompany;
		constructor ( public item: Company ) { }
	}

	export type All
		= LoadCompany
		;
}
