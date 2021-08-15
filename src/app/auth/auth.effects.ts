import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions) {
        // a side effect is something extra we do in the app AFTER an action has been dispatched--post reducer
        actions$.subscribe(action => {
            if (action.type == '[Login Page] User Login') { // notice this isn't type safe
                localStorage.setItem('user', JSON.stringify(action["user"]));
            }
        });
    }
}