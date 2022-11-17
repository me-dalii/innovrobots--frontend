import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from 'src/models/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public host = environment.apiUrl + "teacher/";

  constructor( private http : HttpClient ) { }

  public getTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.host);
  }

  public getTeacherById(id : number): Observable<Teacher>{
    return this.http.get<Teacher>(`${this.host}${id}`);
  }

  public saveTeacher(Teacher : Teacher):Observable<Teacher>{
    return this.http.post<Teacher>(this.host, Teacher);
  }

  public deleteTeacher(id : Number):Observable<Teacher>{
    return this.http.delete<Teacher>(`${this.host}${id}`);
  }

  public getTeachersByEventId(id : number): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.host}event/${id}`);
  }
}
