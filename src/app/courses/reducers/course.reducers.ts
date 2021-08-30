import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { Course } from "../model/course";


export interface CoursesState extends EntityState<Course> {
    // entities: {[key: number]: Course},
    // ids: number[]
    // above gets unweildy to manage yourself with more complex objects, so use ngrx built-in instead
}

export const adapter = createEntityAdapter<Course>(); 
// bam, now I don't have to make my own crud functionality to deal with the uncommented code earlier

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCoursesState,
    // nice, was worried about having to write everything up again, but the adapter adds it all by itself
    on(CourseActions.allCoursesLoaded, 
        (state, action) => adapter.addAll(action.courses, state))
);