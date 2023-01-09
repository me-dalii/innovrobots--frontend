import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomFileHandlerService } from 'src/services/CustomFileHandler/custom-file-handler.service';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/Event';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-pe-all',
  templateUrl: './pe-all.component.html',
  styleUrls: ['./pe-all.component.scss'],
  providers: [MessageService]

})
export class PeAllComponent implements OnInit, OnDestroy {

  events : Event[];

  subscriptions : Subscription[] = []

  constructor(private messageService: MessageService, 
    private router : Router,
    private eventService : EventService,
    public chs : CustomFileHandlerService) { }


  ngOnInit(): void {
    this.getEvents();
  }

  ngOnDestroy(): void {
    for(let subscription of this.subscriptions){
      subscription.unsubscribe()
    }
  }

  getEvents() {
    this.subscriptions.push(this.eventService.getEvents().subscribe({
      next: (response: Event[]) => {
        this.events = response;
        console.log(this.events)
        //filter by date
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
    }))
  }

  viewEvent(event){
    this.router.navigate(['previous_editions/',event.id]);
  }
}
