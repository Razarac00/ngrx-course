import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

    constructor(private coursesService: CourseEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // using the loaded$ observable, we get our boolean needed to resolve the route
        // using tap, we create the 'side-effect' of actually putting the course data in the store
        // we then filter on true loaded values only, and return on the first of those true values
        return this.coursesService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.coursesService.getAll();
                }
            }),
            filter(loaded => !!loaded),
            first()
        );
        // ngrx will perform the get by making assumptions: pluralize the entity 'course' with an 's', the path will be presumed
        // to be 'api/courses/, and the response from said path is expected to be the actual course[]
        // depending on the backend service's implementation, this can automatically work, but in our case it doesn't
        // this.coursesService.getAll().pipe(
        //     map(courses => !!courses) // we return true iff there are courses, AND the get will store the course[] in the store
        // );
    }
}