import { Gender } from "src/enums/Gender";
import { AbstractEntity } from "./AbstractEntity";

export interface Speaker extends AbstractEntity{
    firstName? : string;
    lastName? : string;
    cin? : string;
    email? : string;
    phone? : string;
    dob? : Date;
    gender? : Gender;

}