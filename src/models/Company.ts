
import { AbstractEntity } from "./AbstractEntity";
import { Event } from 'src/models/Event';

export interface Company extends AbstractEntity{
    name? : string;
    description? : string;
    email? : string;
    phone? : string;
    address? : string;

    event? : Event;

}