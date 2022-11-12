import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public host = environment.apiUrl + "event/";

  constructor( private http : HttpClient ) { }

  public getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.host);
  }

  public getEventById(id : number): Observable<Event>{
    return this.http.get<Event>(`${this.host}${id}`);
  }

  public getActivatedEvent(): Observable<Event>{
    return this.http.get<Event>(this.host+"activated");
  }

  public saveEvent(event : Event):Observable<Event>{
    return this.http.post<Event>(this.host, event);
  }

  public deleteEvent(id : Number):Observable<Event>{
    return this.http.delete<Event>(`${this.host}${id}`);
  }

  public activateEvent(id : Number):Observable<any>{
    return this.http.put<any>(`${this.host}${id}`,null);
  }
}
