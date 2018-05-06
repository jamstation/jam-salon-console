import { ConsoleState } from './console.state';
import { ConsoleActionTypes, ConsoleAction } from './console.actions';

const initialState: ConsoleState = {
	company: null
}

export function ConsoleReducer ( state = initialState, action: ConsoleAction.All ): ConsoleState
{
	switch ( action.type ) {

		case ConsoleActionTypes.loadCompany:
			return { ...state, company: action.item }

		default:
			return state;

	}
}
