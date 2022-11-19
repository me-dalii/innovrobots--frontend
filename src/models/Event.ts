import { AbstractEntity } from "./AbstractEntity";
import { Committee } from "./Committee";
import { Sponsor } from "./Sponsor";
import { Speaker } from "./Speaker";
import { Student } from "./Student";
import { Teacher } from "./Teacher";
import { Company } from "./Company";
import { CustomFile } from "./CustomFile";

export interface Event extends AbstractEntity{
    name? : string;
    description? : string;
    eventDate? : Date;
    endDate? : Date;
    numberOfDays? : number;
    place? : string;

    youtubeTeaserLink? : string;
    youtubeLiveStreamLink? : string;


    status? : boolean;

    speakers? : Speaker[];
    committees? : Committee[];
    sponsors? : Sponsor[];

    students? : Student[];
    numberOfAllowedStudents? : number;
    studentsPrice? : number;

    teachers? : Teacher[];
    numberOfAllowedTeachers? : number;
    teachersPrice? : number;

    companies? : Company[];
    numberOfAllowedCompanies? : number;
    companiesPrice? : number;

    logo? : CustomFile;
    banner? : CustomFile;
    poster? : CustomFile;


}