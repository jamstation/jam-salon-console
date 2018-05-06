import { HomeState } from './home.state';
import { HomeActionTypes, HomeAction } from './home.actions';

const initialState: HomeState = {
	processing: false,
	creating: false,
	company: null
}

export function HomeReducer ( state = initialState, action: HomeAction.All ): HomeState
{
	switch ( action.type ) {

		case HomeActionTypes.load:
			return { ...state, processing: true }

		case HomeActionTypes.loadSuccess:
			return {
				...state,
				processing: false,
				company: action.item
			}

		case HomeActionTypes.loadFailed:
			return { ...state, processing: false }

		case HomeActionTypes.create:
			return { ...state, creating: true }

		case HomeActionTypes.cancelCreate:
			return { ...state, creating: false }

		case HomeActionTypes.addSuccess:
			return { ...state, creating: false }

		case HomeActionTypes.addFailed:
			return { ...state, creating: false }

		default:
			return state;
	}
}
