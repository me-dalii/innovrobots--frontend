import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Gender } from 'src/enums/Gender';
import { University } from 'src/enums/University';
import { Event } from 'src/models/Event';
import { Student } from 'src/models/Student';
import { EventService } from 'src/services/event.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [MessageService]
})
export class StudentComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password!: string;

  studentForm : FormGroup;

  gender = Gender;
  genders = [];
  uni = University;
  unis = [];

  event : Event;

  subscriptions : Subscription[] = []

  constructor(private messageService: MessageService,
     private router : Router,
     private studentService: StudentService, 
     private eventService: EventService) { }

  ngOnInit(): void {
    this.getActivatedEvent();

    this.genders = Object.keys(this.gender);
    this.unis = Object.keys(this.uni);

    this.studentForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob : new FormControl(''),
      gender : new FormControl(''),
      university : new FormControl(''),
      grade : new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    for(let subscription of this.subscriptions){
      subscription.unsubscribe()
    }
  }

  getActivatedEvent(){
    this.subscriptions.push(this.eventService.getActivatedEvent().subscribe(
      (data) => {
        this.event = data;
        console.log(this.event);
      }
    ))
  }
  
  saveStudent(){
    let student = this.studentForm.value;
    student.event = this.event;
    this.subscriptions.push(this.studentService.saveStudent(student).subscribe({
      next: (response: Student) => {
        this.studentForm.reset();
        // this.messageService.add({ severity: 'success', summary: 'success', detail: 'Student Added', life: 3000 });
        this.router.navigate(['registration/success']);
      },
      error: (e) => {
        //if error 406 -> full capacity
        if(e.status == 406){
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Sorry We have reached maximum Capacity!', life: 3000 });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something went wrong!', life: 3000 });
        }
      },
      complete: () => {}
    }))
  }
}
