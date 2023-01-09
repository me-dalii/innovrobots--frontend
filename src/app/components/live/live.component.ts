import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Event } from 'src/models/Event';
import { CustomFileHandlerService } from 'src/services/CustomFileHandler/custom-file-handler.service';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  providers: [MessageService]
})
export class LiveComponent implements OnInit, OnDestroy {

  event : Event;

  subscriptions : Subscription[] = []

  constructor(
    private eventService: EventService,
    public chs : CustomFileHandlerService) { }

  ngOnInit(): void {
    this.getactivatedEvent()
  }

  ngOnDestroy(): void {
    for(let subscription of this.subscriptions){
      subscription.unsubscribe()
    }
  }
  
  getactivatedEvent() {
    this.subscriptions.push(this.eventService.getActivatedEvent().subscribe({
      next: (response: Event) => {this.event = response;},
      error: (e) => console.warn("can't get"),
      complete: () => {}
    }))
  }

}
