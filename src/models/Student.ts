import { Gender } from "src/enums/Gender";
import { AbstractEntity } from "./AbstractEntity";
import { Event } from 'src/models/Event';

export interface Student extends AbstractEntity{
    firstName? : string;
    lastName? : string;
    email? : string;
    phone? : string;
    dob? : Date;
    gender? : Gender;
    university? : string;
    grade? : string;
    
    event? : Event;

}