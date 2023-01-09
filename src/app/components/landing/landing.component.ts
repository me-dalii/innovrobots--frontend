import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/Event';
import { SpeakerService } from 'src/services/speaker.service';
import { CommitteeService } from 'src/services/committee.service';
import { SponsorService } from 'src/services/sponsor.service';
import { Committee } from 'src/models/Committee';
import { Type } from 'src/enums/Type';
import {PrimeIcons} from 'primeng/api';
import { formatDate } from '@angular/common';
import { CustomFileHandlerService } from 'src/services/CustomFileHandler/custom-file-handler.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {

  event : Event;

  scientificCommittee : Committee[];
  organizationCommittee : Committee[];

  timelineData : any[];

  responsiveOptions;

  subscriptions : Subscription[] = []

  constructor(public router: Router, 
    private eventService : EventService, 
    private speakerService : SpeakerService, 
    private committeeService : CommitteeService, 
    private sponsorService : SponsorService, 
    private chs : CustomFileHandlerService) { }
  

  ngOnInit(): void {
    this.getactivatedEvent();

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  ngOnDestroy(): void {
    for(let subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }

  goToManager(){
    this.router.navigate(['/manage']);
  }

  toRegistration(){
    this.router.navigate(['/registration']);
  }

  toLive(){
    this.router.navigate(['/live']);
  }
  
  getactivatedEvent() {
    this.subscriptions.push(this.eventService.getActivatedEvent().subscribe({
      next: (response: Event) => {
        this.event = response;
      },
      error: (e) => console.warn("can't get"),
      complete: () => {
        this.getSpeakers();
        this.getCommittees();
        this.getSponsors();
        this.timelineData = [
          {status: 'Start Date', date: formatDate(this.event.eventDate,'dd/MM/yyyy','en-US'), icon: PrimeIcons.ARROW_CIRCLE_DOWN, color: '#9C27B0'},
          {status: 'End Date', date: formatDate(this.event.endDate,'dd/MM/yyyy','en-US'), icon: PrimeIcons.CHECK_CIRCLE, color: '#607D8B'},
        ];
      }
    }))
  }

  getSpeakers(){
    this.subscriptions.push(this.speakerService.getSpeakersByEventId(this.event.id).subscribe({
      next: (response) => {
        this.event.speakers = response;
      },
      error: (e) => console.warn("can't get"),
      complete: () => console.info("complete")
    }))
  }

  getCommittees(){
    this.subscriptions.push(this.committeeService.getCommitteesByEventId(this.event.id).subscribe({
      next: (response) => {
        this.event.committees = response;
      },
      error: (e) => console.warn("can't get"),
      complete: () => {
        //filter scientific committee
        this.scientificCommittee = this.event.committees.filter(committee => committee.type == Type.SCIENTIFIC);
        //filter organization committee
        this.organizationCommittee = this.event.committees.filter(committee => committee.type == Type.ORGANIZATION);
      }
    }))
  }

  getSponsors(){
    this.subscriptions.push(this.sponsorService.getSponsorsByEventId(this.event.id).subscribe({
      next: (response) => {
        this.event.sponsors = response;
      },
      error: (e) => console.warn("can't get"),
      complete: () => console.info("complete")
    }))
  }

  scroll(to){
    let el = document.getElementById(to);
    el.scrollIntoView({behavior:"smooth"});
  }


}
