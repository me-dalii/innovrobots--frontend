import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Gender } from 'src/enums/Gender';
import { University } from 'src/enums/University';
import { Event } from 'src/models/Event';
import { Teacher } from 'src/models/Teacher';
import { EventService } from 'src/services/event.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [MessageService]
})
export class TeacherComponent implements OnInit {

  valCheck: string[] = ['remember'];

  teacherForm : FormGroup;

  gender = Gender;
  genders = [];
  uni = University;
  unis = [];

  event : Event;

  constructor(private messageService: MessageService, private router : Router, private teacherService: TeacherService
    , private eventService: EventService) { }

  ngOnInit(): void {

    this.getActivatedEvent();

    this.genders = Object.keys(this.gender);
    this.unis = Object.keys(this.uni);

    this.teacherForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob : new FormControl(''),
      gender : new FormControl(''),
      university : new FormControl(''),
    });
  }

  getActivatedEvent(){
    this.eventService.getActivatedEvent().subscribe(
      (data) => {
        this.event = data;
      }
    )
  }
  
  saveTeacher(){
    let teacher = this.teacherForm.value;
    teacher.event = this.event;
    this.teacherService.saveTeacher(teacher).subscribe({
      next: (response: Teacher) => {
        this.teacherForm.reset();
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
    })
  }

}
