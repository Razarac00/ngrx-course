import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

    constructor(private coursesService: CourseEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // ngrx will perform the get by making assumptions: pluralize the entity 'course' with an 's', the path will be presumed
        // to be 'api/courses/, and the response from said path is expected to be the actual course[]
        // depending on the backend service's implementation, this can automatically work, but in our case it doesn't
        return this.coursesService.getAll().pipe(
            map(courses => !!courses) // we return true iff there are courses, AND the get will store the course[] in the store
        );
    }
}