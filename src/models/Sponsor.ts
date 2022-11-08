import { Gender } from "src/enums/Gender";
import { Type } from "src/enums/Type";
import { AbstractEntity } from "./AbstractEntity";

export interface Sponsor extends AbstractEntity{
    name? : string;
    description? : string;

}