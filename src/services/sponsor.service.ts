import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sponsor } from 'src/models/Sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  public host = environment.apiUrl + "sponsor/";

  constructor( private http : HttpClient ) { }

  public getSponsors(): Observable<Sponsor[]>{
    return this.http.get<Sponsor[]>(this.host);
  }

  public getSponsorById(id : number): Observable<Sponsor>{
    return this.http.get<Sponsor>(`${this.host}${id}`);
  }

  public saveSponsor(Sponsor : Sponsor):Observable<Sponsor>{
    return this.http.post<Sponsor>(this.host, Sponsor);
  }

  public deleteSponsor(id : Number):Observable<Sponsor>{
    return this.http.delete<Sponsor>(`${this.host}${id}`);
  }

  public getSponsorsByEventId(id : number): Observable<Sponsor[]>{
    return this.http.get<Sponsor[]>(`${this.host}event/${id}`);
  }
}
