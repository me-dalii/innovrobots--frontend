import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Type } from 'src/enums/Type';
import { Committee } from 'src/models/Committee';
import { Event } from 'src/models/Event';
import { Photo } from 'src/models/Photo';
import { CommitteeService } from 'src/services/committee.service';
import { CustomFileHandlerService } from 'src/services/CustomFileHandler/custom-file-handler.service';
import { EventService } from 'src/services/event.service';
import { PhotoService } from 'src/services/photo.service';
import { SpeakerService } from 'src/services/speaker.service';
import { SponsorService } from 'src/services/sponsor.service';

@Component({
  selector: 'app-pe-details',
  templateUrl: './pe-details.component.html',
  styleUrls: ['./pe-details.component.scss'],
  providers: [MessageService]
})
export class PeDetailsComponent implements OnInit, OnDestroy {

  scientificCommittee : Committee[];
  organizationCommittee : Committee[];

  event : Event;
  pathId: number;

  responsiveOptions : any;
  responsiveOptions2:any[] = [
    {
        breakpoint: '1500px',
        numVisible: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  subscriptions : Subscription[] = [];

  activeIndex: number = 0;
  displayCustom: boolean;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    public chs : CustomFileHandlerService,
    private messageService : MessageService,
    private eventService: EventService, 
    private speakerService : SpeakerService, 
    private committeeService : CommitteeService, 
    private sponsorService : SponsorService,
    private photoService : PhotoService,

    ) { }
  

  ngOnInit(): void {
    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getEvent();

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
      subscription.unsubscribe()
    }
  }

  getEvent() {
    this.subscriptions.push(this.eventService.getEventById(this.pathId).subscribe({
      next: (response: Event) => this.event = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Loading Failed', life: 3000 }),
      complete: () => {
        this.getSpeakers();
        this.getCommittees();
        this.getSponsors();
        this.getPhotosByEvent();

      }
    }))
  }

  getSpeakers(){
    this.subscriptions.push(this.speakerService.getSpeakersByEventId(this.event.id).subscribe({
      next: (response) => {this.event.speakers = response},
      error: (e) => console.warn("can't get"),
      complete: () => console.info("complete")
    }))
  }

  getCommittees(){
    this.subscriptions.push(this.committeeService.getCommitteesByEventId(this.event.id).subscribe({
      next: (response) => {this.event.committees = response},
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
      next: (response) => {this.event.sponsors = response},
      error: (e) => console.warn("can't get"),
      complete: () => console.info("complete")
    }))
  }

  //album
  getPhotosByEvent(){
    this.subscriptions.push(this.photoService.getPhotosByEventId(this.event.id).subscribe({
      next: (response: Photo[]) => {
        this.event.album = response;
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => {console.log(this.event)}
    }))
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  } 
  

}
