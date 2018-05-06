import { Injectable } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NavigatorAction } from "../../../jam/navigator";
import { LayoutModuleState } from "./layout.state";
import { LayoutActionTypes, LayoutAction } from "./layout.actions";


@Injectable()
export class LayoutEffects
{
	@Effect() public selectNavItem: Observable<Action>;

	constructor (
		private actions: Actions,
		private observableMedia: ObservableMedia
	)
	{

		this.selectNavItem = this.actions.pipe(
			ofType<LayoutAction.SelectNavItem>( LayoutActionTypes.selectNavItem ),
			map( action => new NavigatorAction.Navigate( action.navItem.link ) )
		);

	}
}
