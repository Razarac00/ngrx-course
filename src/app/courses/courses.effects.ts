import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { allCoursesLoaded } from "./course.actions";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => 
                this.coursesHttpService.findAllCourses()),
            map(courses => allCoursesLoaded({courses}))
        )
    ); // setup the effect on action loadAllCourses to get all the courses from the service, then map it to allCoursesLoaded

    saveCourses$ = createEffect( // optimistically update the backend
        () => this.actions$.pipe(
            ofType(CourseActions.courseUpdated),
            concatMap(action => this.coursesHttpService.saveCourse(
                action.update.id, action.update.changes
            ))
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {

    }
}