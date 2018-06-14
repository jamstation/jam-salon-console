import { StylistState } from './stylist.state';
import { StylistActionTypes, StylistAction } from './stylist.actions';

const initialState: StylistState = {
	list: [],
	serviceList: [],
	processing: false,
	loading: false,
	creating: false,
	editing: false,
	formItem: null
}

export function StylistReducer ( state = initialState, action: StylistAction.All ): StylistState
{
	switch ( action.type ) {

		case StylistActionTypes.load:
			return {
				...state,
				processing: true,
				loading: true
			};

		case StylistActionTypes.loadSuccess:
			return {
				...state,
				processing: false,
				loading: false,
				list: action.list,
				serviceList: action.serviceList
			};

		case StylistActionTypes.create:
			return {
				...state,
				creating: true,
				formItem: { key: null, name: null, serviceList: [] }
			};

		case StylistActionTypes.cancelCreate:
			return {
				...state,
				creating: false
			};

		case StylistActionTypes.edit:
			return {
				...state,
				editing: true,
				formItem: JSON.parse( JSON.stringify( action.item ) )
			};

		case StylistActionTypes.cancelEdit:
			return {
				...state,
				editing: false
			};

		case StylistActionTypes.addSuccess:
			return {
				...state,
				creating: false
			};

		case StylistActionTypes.modifySuccess:
			return {
				...state,
				editing: false
			};

		default:
			return state;
	}
}
