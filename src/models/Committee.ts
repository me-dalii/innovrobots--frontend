import { Gender } from "src/enums/Gender";
import { Type } from "src/enums/Type";
import { AbstractEntity } from "./AbstractEntity";

export interface Committee extends AbstractEntity{
    firstName? : string;
    lastName? : string;
    cin? : string;
    email? : string;
    phone? : string;
    dob? : Date;
    gender? : Gender;
    type? : Type;

}