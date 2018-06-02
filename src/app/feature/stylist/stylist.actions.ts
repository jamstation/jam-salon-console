import { Action } from '@ngrx/store';
import { Stylist, Service } from '../../shared/model';

export const enum StylistActionTypes
{
	load = '[Stylist] load',
	loadSuccess = '[Stylist] loadSuccess',
	create = '[Stylist] create',
	cancelCreate = '[Stylist] cancelCreate',
	edit = '[Stylist] edit',
	cancelEdit = '[Stylist] cancelEdit',
	add = '[Stylist] add',
	addSuccess = '[Stylist] addSuccess',
	addFailed = '[Stylist] addFailed',
	modify = '[Stylist] modify',
	modifySuccess = '[Stylist] modifySuccess',
	modifyFailed = '[Stylist] modifyFailed',
	remove = '[Stylist] remove',
	removeSuccess = '[Stylist] removeSuccess',
	removeFailed = '[Stylist] removeFailed'
}

export namespace StylistAction
{
	export class Load implements Action
	{
		public readonly type = StylistActionTypes.load;
		constructor () { }
	}

	export class LoadSuccess implements Action
	{
		public readonly type = StylistActionTypes.loadSuccess;
		constructor ( public list: Stylist[], public serviceList: Service[] ) { }
	}

	export class Create implements Action
	{
		public readonly type = StylistActionTypes.create;
		constructor () { }
	}

	export class CancelCreate implements Action
	{
		public readonly type = StylistActionTypes.cancelCreate;
		constructor () { }
	}

	export class Edit implements Action
	{
		public readonly type = StylistActionTypes.edit;
		constructor ( public item: Stylist ) { }
	}

	export class CancelEdit implements Action
	{
		public readonly type = StylistActionTypes.cancelEdit;
		constructor () { }
	}

	export class Add implements Action
	{
		public readonly type = StylistActionTypes.add;
		constructor ( public item: Stylist ) { }
	}

	export class AddSuccess implements Action
	{
		public readonly type = StylistActionTypes.addSuccess;
		constructor ( public key: string ) { }
	}

	export class AddFailed implements Action
	{
		public readonly type = StylistActionTypes.addFailed;
		constructor () { }
	}

	export class Modify implements Action
	{
		public readonly type = StylistActionTypes.modify;
		constructor ( public item: Stylist ) { }
	}

	export class ModifySuccess implements Action
	{
		public readonly type = StylistActionTypes.modifySuccess;
		constructor ( public key: string ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = StylistActionTypes.modifyFailed;
		constructor () { }
	}

	export class Remove implements Action
	{
		public readonly type = StylistActionTypes.remove;
		constructor ( public item: Stylist ) { }
	}

	export class RemoveSuccess implements Action
	{
		public readonly type = StylistActionTypes.removeSuccess;
		constructor ( public item: Stylist ) { }
	}

	export class RemoveFailed implements Action
	{
		public readonly type = StylistActionTypes.removeFailed;
		constructor () { }
	}

	export type All
		= Load
		| LoadSuccess
		| Create
		| CancelCreate
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
