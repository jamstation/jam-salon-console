import { ServiceState } from './service.state';
import { ServiceActionTypes, ServiceAction } from './service.actions';

const initialState: ServiceState = {
	list: [],
	processing: false,
	loading: false,
	creating: false,
	editing: false,
	formItem: null
}

export function ServiceReducer ( state = initialState, action: ServiceAction.All ): ServiceState
{
	switch ( action.type ) {

		case ServiceActionTypes.load:
			return {
				...state,
				processing: true,
				loading: true
			};

		case ServiceActionTypes.loaded:
			return {
				...state,
				processing: false,
				loading: false,
				list: action.list
			};

		case ServiceActionTypes.create:
			return {
				...state,
				creating: true,
				formItem: { key: null, name: null, price: 0, duration: 0 }
			};

		case ServiceActionTypes.cancelCreate:
			return {
				...state,
				creating: false
			};

		case ServiceActionTypes.edit:
			return {
				...state,
				editing: true,
				formItem: JSON.parse( JSON.stringify( action.item ) )
			};

		case ServiceActionTypes.cancelEdit:
			return {
				...state,
				editing: false
			};

		case ServiceActionTypes.added:
			return {
				...state,
				creating: false
			};

		case ServiceActionTypes.modified:
			return {
				...state,
				editing: false
			};

		default:
			return state;
	}
}
