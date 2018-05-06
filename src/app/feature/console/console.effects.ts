import { Injectable } from "@angular/core";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class ConsoleEffects
{
	constructor ( private actions: Actions )
	{

	}
}
