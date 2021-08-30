import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { compareCourses, Course } from "../model/course";


export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean
    // entities: {[key: number]: Course},
    // ids: number[]
    // above gets unweildy to manage yourself with more complex objects, so use ngrx built-in instead
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // selectId: course => course.id // in the event that the id is custom--i.e., not named 'id'
}); 
// bam, now I don't have to make my own crud functionality to deal with the uncommented code earlier

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    // nice, was worried about having to write everything up again, but the adapter adds it all by itself
    on(CourseActions.allCoursesLoaded, 
        (state, action) => adapter.addAll(action.courses, 
            {...state, allCoursesLoaded: true})), // {...obj} makes a shallow copy

    on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state)) // after updating, change the state
);

export const {
    selectAll
} = adapter.getSelectors(); // check it out: you can export just a method