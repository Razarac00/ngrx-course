import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const login = createAction(
    // "[The place in the app where the action is getting dispatched from] event or command"
    "[Login Page] User Login",
    props<{user: User}>()
);

