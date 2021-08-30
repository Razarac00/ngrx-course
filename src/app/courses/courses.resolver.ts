import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";


// resolvers are the best place to fetch data--we do not show the screen we are routing to until the data has been resolved here
@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            select(areCoursesLoaded),
            tap(coursesLoaded => {
                if (!this.loading && !coursesLoaded) { // avoid dispatching multiple times during navigation
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            filter(coursesLoaded => coursesLoaded),
            first(),
            finalize(() => this.loading = false)
        );
    }
}