import { CheckInState } from './check-in.state';
import { CheckInActionTypes, CheckInAction } from './check-in.actions';

const initialState: CheckInState = {
	list: [],
	serviceList: [],
	stylistList: [],
	processing: false,
	loading: false,
	creating: false,
	editing: false,
	formItem: null
}

export function CheckInReducer ( state = initialState, action: CheckInAction.All ): CheckInState
{
	switch ( action.type ) {

		case CheckInActionTypes.load:
			return {
				...state,
				processing: true,
				loading: true
			};

		case CheckInActionTypes.loadSuccess:
			return {
				...state,
				processing: false,
				loading: false,
				list: action.list
			};

		case CheckInActionTypes.loadServiceList:
			return {
				...state,
				processing: true,
				loading: true
			};

		case CheckInActionTypes.loadServiceListSuccess:
			return {
				...state,
				processing: false,
				loading: false,
				serviceList: action.list
			};

		case CheckInActionTypes.loadStylistList:
			return {
				...state,
				processing: true,
				loading: true
			};

		case CheckInActionTypes.loadStylistListSuccess:
			return {
				...state,
				processing: false,
				loading: false,
				stylistList: action.list
			};

		case CheckInActionTypes.create:
			return {
				...state,
				creating: true,
				formItem: { key: null, token: null, time: null }
			};

		case CheckInActionTypes.edit:
			return {
				...state,
				editing: true,
				formItem: JSON.parse( JSON.stringify( action.item ) )
			};

		case CheckInActionTypes.cancelEdit:
			return {
				...state,
				editing: false
			};

		case CheckInActionTypes.addSuccess:
			return {
				...state,
				creating: false
			};

		case CheckInActionTypes.modifySuccess:
			return {
				...state,
				editing: false
			};

		default:
			return state;
	}
}
