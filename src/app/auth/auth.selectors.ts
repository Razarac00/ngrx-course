import { createSelector } from "@ngrx/store";

// a mapping function that acts as a store query specifically to grab the auth from the appstate and perform the 
// !! check on it. We use the selector to optimize this: it stores it inMemory so we don't have to keep generating
// it, avoid re-assigning the variable with a value when the value hasn't changed, and performing a call to access 
// that part of the state. This is a 'memoized' function
export const isLoggedIn = createSelector(
    state => state["auth"], // input state object
    (auth) => !!auth.user // projector function
);

export const isLoggedOut = createSelector(
    isLoggedIn, 
    loggedIn => !loggedIn // loggedIn is the result coming from the input state object
);