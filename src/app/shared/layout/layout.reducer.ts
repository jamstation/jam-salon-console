import { LayoutState } from './layout.state';
import { LayoutActionTypes, LayoutAction } from './layout.actions';
import { ScreenSizes } from '../../../jam/model-library';

const initialState: LayoutState = {
}

export function LayoutReducer ( state = initialState, action: LayoutAction.All ): LayoutState
{
	switch ( action.type ) {

		default:
			return state;
	}
}
