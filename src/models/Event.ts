import { AbstractEntity } from "./AbstractEntity";
import { Committee } from "./Committee";
import { Sponsor } from "./Sponsor";
import { Speaker } from "./Speaker";


export interface Event extends AbstractEntity{
    name? : string;
    description? : string;
    eventDate? : Date;
    endDate? : Date;
    numberOfDays? : number;
    place? : string;
    participantsEstimation? : number;

    status? : boolean;

    speakers? : Speaker[];
    committees? : Committee[];
    sponsors? : Sponsor[];

}