import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Event } from 'src/models/Event';
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



  constructor(private messageService: MessageService, private eventService : EventService) { }

  ngOnInit(): void {

    this.getEvents();

    this.eventForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl(''),
      endDate: new FormControl(''),
      numberOfDays: new FormControl(''),
      place: new FormControl(''),
      participantsEstimation: new FormControl(''),
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
      'description': this.eventForm.get('description').value,
      'eventDate': this.eventForm.get('eventDate').value,
      'endDate': this.eventForm.get('endDate').value,
      'numberOfDays': this.eventForm.get('numberOfDays').value,
      'place': this.eventForm.get('place').value,
      'participantsEstimation': this.eventForm.get('participantsEstimation').value,
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

  editEvent(event : Event){
    this.eventForm.reset()
    this.event = {...event};
    this.eventForm.get('id').setValue(event.id)
    this.eventForm.get('description').setValue(event.description)
    this.eventForm.get('eventDate').setValue(event.eventDate)
    this.eventForm.get('endDate').setValue(event.endDate)
    this.eventForm.get('numberOfDays').setValue(event.numberOfDays)
    this.eventForm.get('place').setValue(event.place)
    this.eventForm.get('participantsEstimation').setValue(event.participantsEstimation)
    this.eventDialog = true;
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

}
