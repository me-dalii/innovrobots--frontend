import { AbstractEntity } from "./AbstractEntity";

export interface Photo extends AbstractEntity{

    photoName? : string;
    data? : string;

}