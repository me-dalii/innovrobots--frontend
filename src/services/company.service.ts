import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from 'src/models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public host = environment.apiUrl + "company/";

  constructor( private http : HttpClient ) { }

  public getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(this.host);
  }

  public getCompanyById(id : number): Observable<Company>{
    return this.http.get<Company>(`${this.host}${id}`);
  }

  public saveCompany(Company : Company):Observable<Company>{
    return this.http.post<Company>(this.host, Company);
  }

  public deleteCompany(id : Number):Observable<Company>{
    return this.http.delete<Company>(`${this.host}${id}`);
  }

  public getCompaniesByEventId(id : number): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.host}event/${id}`);
  }
}
