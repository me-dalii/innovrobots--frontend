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

  public saveLogo(id : number, formData : FormData):Observable<Event>{
    return this.http.post<Event>(`${this.host}logo/${id}`, formData);
  }

  public deleteLogo(id : Number):Observable<Event>{
    return this.http.delete<Event>(`${this.host}logo/${id}`);
  }

  public saveBanner(id : number, formData : FormData):Observable<Event>{
    return this.http.post<Event>(`${this.host}banner/${id}`, formData);
  }

  public deleteBanner(id : Number):Observable<Event>{
    return this.http.delete<Event>(`${this.host}banner/${id}`);
  }

  public savePoster(id : number, formData : FormData):Observable<Event>{
    return this.http.post<Event>(`${this.host}poster/${id}`, formData);
  }

  public deletePoster(id : Number):Observable<Event>{
    return this.http.delete<Event>(`${this.host}poster/${id}`);
  }

  public saveTeaser(id : number, link : string):Observable<any>{
    return this.http.post<any>(`${this.host}teaser/${id}`, link);
  }

  public resetTeaser(id : Number):Observable<any>{
    return this.http.delete<any>(`${this.host}teaser/${id}`);
  }

  public saveLiveStream(id : number, link : string):Observable<any>{
    return this.http.post<any>(`${this.host}liveStream/${id}`, link);
  }

  public resetLiveStream(id : Number):Observable<any>{
    return this.http.delete<any>(`${this.host}liveStream/${id}`);
  }

}
