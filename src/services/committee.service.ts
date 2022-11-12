import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Committee } from 'src/models/Committee';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {

  public host = environment.apiUrl + "committee/";

  constructor( private http : HttpClient ) { }

  public getCommittees(): Observable<Committee[]>{
    return this.http.get<Committee[]>(this.host);
  }

  public getCommitteesByEventId(id : number): Observable<Committee[]>{
    return this.http.get<Committee[]>(`${this.host}event/${id}`);
  }

  public getCommitteeById(id : number): Observable<Committee>{
    return this.http.get<Committee>(`${this.host}${id}`);
  }

  public saveCommittee(Committee : Committee):Observable<Committee>{
    return this.http.post<Committee>(this.host, Committee);
  }

  public deleteCommittee(id : Number):Observable<Committee>{
    return this.http.delete<Committee>(`${this.host}${id}`);
  }
}
