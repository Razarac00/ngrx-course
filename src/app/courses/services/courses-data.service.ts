import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
    
    constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Course', http, httpUrlGenerator); // 1st arg is the name of the entity we are managing with ngrx
    }

    // if we don't want to write this dataservice class, follow the conventions set by ngrx: 
    // path = '/api/objects/', response = at the root level, not in another json object
    getAll(): Observable<Course[]> {
        return this.http.get('/api/courses').pipe(
            map(res => res["payload"]) // now ngrx will know to use api/courses url to get from the payload response
        );
    } 
    // also want to point out that fixing the issue with the resolver did not require ANY changes TO the resolver
    // our concerns are well separated and modularized: we created a new component and simply slotted it into the module
}