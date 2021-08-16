import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

// make sure to stop server when creating effects
@Injectable()
export class AuthEffects {

    login$ = createEffect(() => 
        this.actions$
        .pipe(
            ofType(AuthActions.login), // instead of using rxjs filter use ofType
            tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
        )
        , {dispatch: false} 
        // note: without this being set to false, the login action would have kept going infinitely
    ); // createEffect auto subscribes and does error-handling to protect against corruption of the observable


    logout$ = createEffect(() => 
            this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/login');
                })
            )
            , {dispatch: false}
    );

    constructor(private actions$: Actions, private router: Router) {
        // a side effect is something extra we do in the app AFTER an action has been dispatched--post reducer

        // actions$.subscribe(action => {
        //     if (action.type == '[Login Page] User Login') { // notice this isn't type safe
        //         localStorage.setItem('user', JSON.stringify(action["user"])); // same issue here
        //     }
        // });
    }
}