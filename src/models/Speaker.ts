import { Gender } from "src/enums/Gender";
import { AbstractEntity } from "./AbstractEntity";
import { Event } from 'src/models/Event';

export interface Speaker extends AbstractEntity{
    firstName? : string;
    lastName? : string;
    cin? : string;
    email? : string;
    phone? : string;
    dob? : Date;
    gender? : Gender;
    event? : Event;

}