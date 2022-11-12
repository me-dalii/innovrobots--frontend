import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Speaker } from 'src/models/Speaker';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  public host = environment.apiUrl + "speaker/";

  constructor( private http : HttpClient ) { }

  public getSpeakers(): Observable<Speaker[]>{
    return this.http.get<Speaker[]>(this.host);
  }

  public getSpeakersByEventId(id : number): Observable<Speaker[]>{
    return this.http.get<Speaker[]>(`${this.host}event/${id}`);
  }

  public getSpeakerById(id : number): Observable<Speaker>{
    return this.http.get<Speaker>(`${this.host}${id}`);
  }

  public saveSpeaker(Speaker : Speaker):Observable<Speaker>{
    return this.http.post<Speaker>(this.host, Speaker);
  }

  public deleteSpeaker(id : Number):Observable<Speaker>{
    return this.http.delete<Speaker>(`${this.host}${id}`);
  }
}
