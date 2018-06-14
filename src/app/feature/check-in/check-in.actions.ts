import { Action } from '@ngrx/store';
import { CheckIn, Service, Stylist } from '../../shared/model';

export const enum CheckInActionTypes
{
	load = '[CheckIn] load',
	loadSuccess = '[CheckIn] loadSuccess',
	create = '[CheckIn] create',
	edit = '[CheckIn] edit',
	cancelEdit = '[CheckIn] cancelEdit',
	add = '[CheckIn] add',
	addSuccess = '[CheckIn] addSuccess',
	addFailed = '[CheckIn] addFailed',
	modify = '[CheckIn] modify',
	modifySuccess = '[CheckIn] modifySuccess',
	modifyFailed = '[CheckIn] modifyFailed',
	remove = '[CheckIn] remove',
	removeSuccess = '[CheckIn] removeSuccess',
	removeFailed = '[CheckIn] removeFailed'
}

export namespace CheckInAction
{
	export class Load implements Action
	{
		public readonly type = CheckInActionTypes.load;
		constructor () { }
	}

	export class LoadSuccess implements Action
	{
		public readonly type = CheckInActionTypes.loadSuccess;
		constructor ( public list: CheckIn[], public stylistList: Stylist[], public serviceList: Service[] ) { }
	}

	export class Create implements Action
	{
		public readonly type = CheckInActionTypes.create;
		constructor () { }
	}

	export class Edit implements Action
	{
		public readonly type = CheckInActionTypes.edit;
		constructor ( public item: CheckIn ) { }
	}

	export class CancelEdit implements Action
	{
		public readonly type = CheckInActionTypes.cancelEdit;
		constructor () { }
	}

	export class Add implements Action
	{
		public readonly type = CheckInActionTypes.add;
		constructor ( public item: CheckIn ) { }
	}

	export class AddSuccess implements Action
	{
		public readonly type = CheckInActionTypes.addSuccess;
		constructor ( public key: string ) { }
	}

	export class AddFailed implements Action
	{
		public readonly type = CheckInActionTypes.addFailed;
		constructor () { }
	}

	export class Modify implements Action
	{
		public readonly type = CheckInActionTypes.modify;
		constructor ( public item: CheckIn ) { }
	}

	export class ModifySuccess implements Action
	{
		public readonly type = CheckInActionTypes.modifySuccess;
		constructor ( public key: string ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = CheckInActionTypes.modifyFailed;
		constructor () { }
	}

	export class Remove implements Action
	{
		public readonly type = CheckInActionTypes.remove;
		constructor ( public item: CheckIn ) { }
	}

	export class RemoveSuccess implements Action
	{
		public readonly type = CheckInActionTypes.removeSuccess;
		constructor ( public item: CheckIn ) { }
	}

	export class RemoveFailed implements Action
	{
		public readonly type = CheckInActionTypes.removeFailed;
		constructor () { }
	}

	export type All
		= Load
		| LoadSuccess
		| Create
		| Edit
		| CancelEdit
		| Add
		| AddSuccess
		| AddFailed
		| Modify
		| ModifySuccess
		| ModifyFailed
		| Remove
		| RemoveSuccess
		| RemoveFailed
		;
}
