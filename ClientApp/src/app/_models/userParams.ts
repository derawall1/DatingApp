import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { User } from "./user";

export class UserParams{
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 5;
    orderyBy = 'lastActiveDate'
    /**
     *
     */
    constructor(user:User) {
        this.gender = user.gender === 'male' ? 'female' : 'male';
        
    }
}