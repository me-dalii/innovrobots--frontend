import { Gender } from "src/enums/Gender";
import { Type } from "src/enums/Type";
import { AbstractEntity } from "./AbstractEntity";
import { Event } from 'src/models/Event';

export interface Committee extends AbstractEntity{
    firstName? : string;
    lastName? : string;
    cin? : string;
    email? : string;
    phone? : string;
    dob? : Date;
    gender? : Gender;
    type? : Type;

    event? : Event;

}