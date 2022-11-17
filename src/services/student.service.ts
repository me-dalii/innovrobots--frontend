import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from 'src/models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public host = environment.apiUrl + "student/";

  constructor( private http : HttpClient ) { }

  public getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.host);
  }

  public getStudentById(id : number): Observable<Student>{
    return this.http.get<Student>(`${this.host}${id}`);
  }

  public saveStudent(Student : Student):Observable<Student>{
    return this.http.post<Student>(this.host, Student);
  }

  public deleteStudent(id : Number):Observable<Student>{
    return this.http.delete<Student>(`${this.host}${id}`);
  }

  public getStudentsByEventId(id : number): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.host}event/${id}`);
  }
}
