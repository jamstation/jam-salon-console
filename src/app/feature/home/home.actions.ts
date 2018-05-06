import { Action } from '@ngrx/store';
import { UserApp } from '../../../jam/model-library';
import { Company } from '../../../jam/model-library';

export const enum HomeActionTypes
{
	load = '[Home] load',
	loadSuccess = '[Home] loadSuccess',
	loadFailed = '[Home] loadFailed',
	create = '[Home] create',
	cancelCreate = '[Home] cancelCreate',
	add = '[Home] add',
	addSuccess = '[Home] addSuccess',
	addFailed = '[Home] addFailed'
}

export namespace HomeAction
{

	export class Load implements Action
	{
		public readonly type = HomeActionTypes.load;
		constructor () { }
	}

	export class LoadSuccess implements Action
	{
		public readonly type = HomeActionTypes.loadSuccess;
		constructor ( public item: UserApp ) { }
	}

	export class LoadFailed implements Action
	{
		public readonly type = HomeActionTypes.loadFailed;
		constructor () { }
	}

	export class Create implements Action
	{
		public readonly type = HomeActionTypes.create;
		constructor () { }
	}

	export class CancelCreate implements Action
	{
		public readonly type = HomeActionTypes.cancelCreate;
		constructor () { }
	}

	export class Add implements Action
	{
		public readonly type = HomeActionTypes.add;
		constructor ( public item: Company ) { }
	}

	export class AddSuccess implements Action
	{
		public readonly type = HomeActionTypes.addSuccess;
		constructor ( public key: string ) { }
	}

	export class AddFailed implements Action
	{
		public readonly type = HomeActionTypes.addFailed;
		constructor () { }
	}

	export type All
		= Load
		| LoadSuccess
		| LoadFailed
		| Create
		| CancelCreate
		| Add
		| AddSuccess
		| AddFailed
		;
}
