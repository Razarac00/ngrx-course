import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>; //$ convention for knowing it is an observable

    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      // this.store.subscribe(state => console.log("store value: ", state));
      // this is a simple way to query the store for information. Selectors are a more advanced way to query the store.
      this.isLoggedIn$ = this.store
      .pipe(
        // map(state => !!state["auth"].user) // using two ! can evaluate the existence of something
        //select(state => !!state["auth"].user) // select does map AND checks if the value has changed
        select(isLoggedIn)
      );

      this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );

    }

    logout() {

    }

}
