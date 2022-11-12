
import { AbstractEntity } from "./AbstractEntity";
import { Event } from 'src/models/Event';

export interface Sponsor extends AbstractEntity{
    name? : string;
    description? : string;

    event? : Event;

}