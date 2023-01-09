import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/models/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public host = environment.apiUrl + "photo/";

  constructor( private http : HttpClient ) { }

  public savePhoto(eventId : number, formData : FormData):Observable<Photo>{
    return this.http.post<Photo>(`${this.host}${eventId}`, formData);
  }

  public deletePhoto(id : Number):Observable<Photo>{
    return this.http.delete<Photo>(`${this.host}${id}`);
  }

  public getPhotosByEventId(id : number): Observable<Photo[]>{
    return this.http.get<Photo[]>(`${this.host}event/${id}`);
  }
}
