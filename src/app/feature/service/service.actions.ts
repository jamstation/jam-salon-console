import { Action } from '@ngrx/store';
import { Service } from '../../shared/model';

export const enum ServiceActionTypes
{
	load = '[Service] load',
	loaded = '[Service] loaded',
	create = '[Service] create',
	cancelCreate = '[Service] cancelCreate',
	edit = '[Service] edit',
	cancelEdit = '[Service] cancelEdit',
	add = '[Service] add',
	added = '[Service] added',
	addFailed = '[Service] addFailed',
	modify = '[Service] modify',
	modified = '[Service] modified',
	modifyFailed = '[Service] modifyFailed',
	remove = '[Service] remove',
	removed = '[Service] removed',
	removeFailed = '[Service] removeFailed'
}

export namespace ServiceAction
{
	export class Load implements Action
	{
		public readonly type = ServiceActionTypes.load;
		constructor () { }
	}

	export class Loaded implements Action
	{
		public readonly type = ServiceActionTypes.loaded;
		constructor ( public list: Service[] ) { }
	}

	export class Create implements Action
	{
		public readonly type = ServiceActionTypes.create;
		constructor () { }
	}

	export class CancelCreate implements Action
	{
		public readonly type = ServiceActionTypes.cancelCreate;
		constructor () { }
	}

	export class Edit implements Action
	{
		public readonly type = ServiceActionTypes.edit;
		constructor ( public item: Service ) { }
	}

	export class CancelEdit implements Action
	{
		public readonly type = ServiceActionTypes.cancelEdit;
		constructor () { }
	}

	export class Add implements Action
	{
		public readonly type = ServiceActionTypes.add;
		constructor ( public item: Service ) { }
	}

	export class Added implements Action
	{
		public readonly type = ServiceActionTypes.added;
		constructor ( public key: string ) { }
	}

	export class AddFailed implements Action
	{
		public readonly type = ServiceActionTypes.addFailed;
		constructor () { }
	}

	export class Modify implements Action
	{
		public readonly type = ServiceActionTypes.modify;
		constructor ( public item: Service ) { }
	}

	export class Modified implements Action
	{
		public readonly type = ServiceActionTypes.modified;
		constructor ( public key: string ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = ServiceActionTypes.modifyFailed;
		constructor () { }
	}

	export class Remove implements Action
	{
		public readonly type = ServiceActionTypes.remove;
		constructor ( public item: Service ) { }
	}

	export class Removed implements Action
	{
		public readonly type = ServiceActionTypes.removed;
		constructor ( public item: Service ) { }
	}

	export class RemoveFailed implements Action
	{
		public readonly type = ServiceActionTypes.removeFailed;
		constructor () { }
	}

	export type All
		= Load
		| Loaded
		| Create
		| CancelCreate
		| Edit
		| CancelEdit
		| Add
		| Added
		| AddFailed
		| Modify
		| Modified
		| ModifyFailed
		| Remove
		| Removed
		| RemoveFailed
		;
}
