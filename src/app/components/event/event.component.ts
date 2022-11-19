import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Event } from 'src/models/Event';
import { CustomFileHandlerService } from 'src/services/CustomFileHandler/custom-file-handler.service';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [MessageService]
})
export class EventComponent implements OnInit {

  events: Event[];
  selectedEvents : Event[];

  event : Event;

  eventDialog : boolean;
  
  deleteEventDialog: boolean = false;
  deleteEventsDialog: boolean = false;

  eventForm: FormGroup;



  constructor(private messageService: MessageService, 
    private eventService : EventService, 
    private router: Router,
    private chs : CustomFileHandlerService) { }

  ngOnInit(): void {

    this.getEvents();

    this.eventForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl(''),
      endDate: new FormControl(''),
      numberOfDays: new FormControl(''),
      place: new FormControl(''),
      numberOfAllowedStudents: new FormControl(''),
      studentsPrice: new FormControl(''),
      numberOfAllowedTeachers: new FormControl(''),
      teachersPrice: new FormControl(''),
      numberOfAllowedCompanies: new FormControl(''),
      companiesPrice: new FormControl(''),
    })
  }

  getEvents() {
    this.eventService.getEvents().subscribe({
      next: (response: Event[]) => this.events = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
    })
  }

  openNew(){
    this.event = {};
    this.eventForm.reset();
    this.eventDialog = true;

  }

  hideDialog(){
    this.eventDialog = false;
  }

  saveEvent(){

    this.event = {
      'id': this.eventForm.get('id').value,
      'name': this.eventForm.get('name').value,
      'description': this.eventForm.get('description').value,
      'eventDate': this.eventForm.get('eventDate').value,
      'endDate': this.eventForm.get('endDate').value,
      'numberOfDays': this.eventForm.get('numberOfDays').value,
      'place': this.eventForm.get('place').value,
      'numberOfAllowedStudents': this.eventForm.get('numberOfAllowedStudents').value,
      'studentsPrice': this.eventForm.get('studentsPrice').value,
      'numberOfAllowedTeachers': this.eventForm.get('numberOfAllowedTeachers').value,
      'teachersPrice': this.eventForm.get('teachersPrice').value,
      'numberOfAllowedCompanies': this.eventForm.get('numberOfAllowedCompanies').value,
      'companiesPrice': this.eventForm.get('companiesPrice').value,

    }

    this.eventService.saveEvent(this.event).subscribe({
      next: (response: Event) => {
        this.eventForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Event Added', life: 3000 });
        this.getEvents();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.eventDialog = false
    })
  
  }

  viewEvent(event){
    this.router.navigate(['manage/event/',event.id]);
  }

  deleteEvent(event: Event){
    this.event = event;
    this.deleteEventDialog = true;
  }

  deleteSelectedEvents(){
    this.deleteEventsDialog = true;
  }


  confirmDelete() {
    this.eventService.deleteEvent(this.event.id).subscribe({
      next: (v) => 
      {
        this.getEvents();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Event Deleted", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteEventDialog = false
    })
    this.event = {};
  }

  confirmDeleteSelected() {
    for (let s of this.selectedEvents) {
      this.eventService.deleteEvent(s.id).subscribe({
        next: (v) => this.getEvents(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
    this.deleteEventsDialog = false;
    this.selectedEvents = null;

  }

  activateEvent(event){
    this.eventService.activateEvent(event.id).subscribe({
      next: (response: Event[]) => this.getEvents(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
    })
  }

}
