import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/Event';
import { Speaker } from 'src/models/Speaker';
import { FormControl, FormGroup } from '@angular/forms';
import { Gender } from 'src/enums/Gender';
import { SpeakerService } from 'src/services/speaker.service';
import { Type } from 'src/enums/Type';
import { Committee } from 'src/models/Committee';
import { CommitteeService } from 'src/services/committee.service';
import { Sponsor } from 'src/models/Sponsor';
import { SponsorService } from 'src/services/sponsor.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  providers: [MessageService]
})
export class EventDetailsComponent implements OnInit {

  pathId: number;

  event : Event;
  eventDetailsDialog : boolean;
  eventForm: FormGroup;

  gender = Gender;
  genders = [];

  type = Type;
  types = [];

  //speaker
  speakers: Speaker[];
  selectedSpeakers : Speaker[];
  speaker : Speaker;
  speakerDialog : boolean;
  deleteSpeakerDialog: boolean = false;
  deleteSpeakersDialog: boolean = false;
  speakerForm: FormGroup;
  
  //committee
  committees: Committee[];
  selectedCommittees : Committee[];
  committee : Committee;
  committeeDialog : boolean;
  deleteCommitteeDialog: boolean = false;
  deleteCommitteesDialog: boolean = false;
  committeeForm: FormGroup;

  //sponsor
  sponsors: Sponsor[];
  selectedSponsors : Sponsor[];
  sponsor : Sponsor;
  sponsorDialog : boolean;
  deleteSponsorDialog: boolean = false;
  deleteSponsorsDialog: boolean = false;
  sponsorForm: FormGroup;

  items: MenuItem[];


  constructor(private route: ActivatedRoute, private sponsorService: SponsorService, private eventService: EventService, private committeeService: CommitteeService, 
    private messageService: MessageService, private speakerService: SpeakerService ) { }

  ngOnInit(): void {
    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.genders = Object.keys(this.gender);
    this.types = Object.keys(this.type);

    this.getEvent();

    this.items = [
      {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [{
                  label: 'Export', 
                  icon: 'pi pi-fw pi-download',
              }
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-file-edit',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      }
    ];

    this.eventForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl(''),
      endDate: new FormControl(''),
      numberOfDays: new FormControl(''),
      place: new FormControl(''),
      participantsEstimation: new FormControl(''),
    });

    this.speakerForm = new FormGroup({
      id: new FormControl(''),
      cin: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob : new FormControl(''),
      gender : new FormControl(''),
    });

    this.committeeForm = new FormGroup({
      id: new FormControl(''),
      cin: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob : new FormControl(''),
      gender : new FormControl(''),
      type : new FormControl(''),
    });

    this.sponsorForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
    });

  }

  getEvent() {
    this.eventService.getEventById(this.pathId).subscribe({
      next: (response: Event) => this.event = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Loading Failed', life: 3000 }),
      complete: () => {
        this.getSpeakers();
        this.getCommittees();
        this.getSponsors();
      }
    })
  }

  toLanding(){
    window.location.href = "/";
  }

  updateButton(){

    this.eventForm.get('id').setValue(this.event.id);
    this.eventForm.get('name').setValue(this.event.name);
    this.eventForm.get('description').setValue(this.event.description);
    this.eventForm.get('eventDate').setValue(new Date(this.event.eventDate));
    this.eventForm.get('endDate').setValue(new Date(this.event.endDate));
    this.eventForm.get('numberOfDays').setValue(this.event.numberOfDays);
    this.eventForm.get('place').setValue(this.event.place);
    this.eventForm.get('participantsEstimation').setValue(this.event.participantsEstimation);

    this.eventDetailsDialog = true;
  }

  updateEvent(){

    this.event = {
      'id': this.eventForm.get('id').value,
      'name': this.eventForm.get('name').value,
      'description': this.eventForm.get('description').value,
      'eventDate': this.eventForm.get('eventDate').value,
      'endDate': this.eventForm.get('endDate').value,
      'numberOfDays': this.eventForm.get('numberOfDays').value,
      'place': this.eventForm.get('place').value,
      'participantsEstimation': this.eventForm.get('participantsEstimation').value,
      'status' : this.event.status
    }

    this.eventService.saveEvent(this.event).subscribe({
      next: (response: Event) => {
        this.eventForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Event Added', life: 3000 });
        this.getEvent();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.eventDetailsDialog = false
    })
  
  }


  //speaker methods
  getSpeakers(){
    this.speakerService.getSpeakersByEventId(this.pathId).subscribe({
      next: (response: Speaker[]) => {
        this.speakers = response;
        this.event.speakers = response;
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
      complete: () => {}
    })
  }

  saveSpeaker(){
    this.speaker = {
      'id': this.speakerForm.get('id').value,
      'firstName': this.speakerForm.get('firstName').value,
      'lastName': this.speakerForm.get('lastName').value,
      'email': this.speakerForm.get('email').value,
      'phone': this.speakerForm.get('phone').value,
      'dob': this.speakerForm.get('dob').value,
      'gender' : this.speakerForm.get('gender').value,
      'cin' : this.speakerForm.get('cin').value,
      'event' : this.event
    }
    this.speakerService.saveSpeaker(this.speaker).subscribe({
      next: (response: Speaker) => {
        this.speakerForm.reset();
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Speaker Added', life: 3000 });
        this.getSpeakers();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.speakerDialog = false
    })
  }

  openNewSpeaker(){
    this.speakerDialog = true;
  }

  editSpeaker(speaker){
    this.speakerForm.get('id').setValue(speaker.id);
    this.speakerForm.get('cin').setValue(speaker.cin);
    this.speakerForm.get('firstName').setValue(speaker.firstName);
    this.speakerForm.get('lastName').setValue(speaker.lastName);
    this.speakerForm.get('email').setValue(speaker.email);
    this.speakerForm.get('phone').setValue(speaker.phone);
    this.speakerForm.get('dob').setValue(new Date(speaker.dob));
    this.speakerForm.get('gender').setValue(speaker.gender);

    this.speakerDialog = true;
  }

  deleteSpeaker(speaker){
    this.speaker = speaker;
    this.deleteSpeakerDialog = true;
  }

  deleteSelectedSpeakers(){
    this.deleteSpeakersDialog = true;
  }

  confirmDeleteSpeaker(){
    this.speakerService.deleteSpeaker(this.speaker.id).subscribe({
      next: (response: Speaker) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Speaker Deleted', life: 3000 });
        this.getSpeakers();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deleteSpeakerDialog = false
    })
  }

  confirmDeleteSpeakers(){
    for(let speaker of this.selectedSpeakers){
      this.speakerService.deleteSpeaker(speaker.id).subscribe({
        next: (response: Speaker) => {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Speaker Deleted', life: 3000 });
          this.getSpeakers();
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => {this.deleteSpeakersDialog = false}
      })
    }
    this.selectedSpeakers = null;
  }


  //sponsor methods
  getSponsors(){
    this.sponsorService.getSponsorsByEventId(this.pathId).subscribe({
      next: (response: Sponsor[]) => {
        this.sponsors = response;
        this.event.sponsors = response;
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Loading Failed', life: 3000 }),
      complete: () => {}
    })
  }

  saveSponsor(){
    this.sponsor = {
      'id': this.sponsorForm.get('id').value,
      'name': this.sponsorForm.get('name').value,
      'description': this.sponsorForm.get('description').value,
      'event' : this.event
    }
    this.sponsorService.saveSponsor(this.sponsor).subscribe({
      next: (response: Sponsor) => {
        this.sponsorForm.reset();
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Sponsor Added', life: 3000 });
        this.getSponsors();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.sponsorDialog = false
    })
  }

  openNewSponsor(){
    this.sponsorDialog = true;
  }

  editSponsor(sponsor){
    this.sponsorForm.get('id').setValue(sponsor.id);
    this.sponsorForm.get('name').setValue(sponsor.name);
    this.sponsorForm.get('description').setValue(sponsor.description);

    this.sponsorDialog = true;
  }

  deleteSponsor(sponsor){
    this.sponsor = sponsor;
    this.deleteSponsorDialog = true;
  }

  deleteSelectedSponsors(){
    this.deleteSponsorsDialog = true;
  }

  confirmDeleteSponsor(){
    this.sponsorService.deleteSponsor(this.sponsor.id).subscribe({
      next: (response: Sponsor) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Sponsor Deleted', life: 3000 });
        this.getSponsors();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deleteSponsorDialog = false
    })
  }

  confirmDeleteSponsors(){
    for(let sponsor of this.selectedSponsors){
      this.sponsorService.deleteSponsor(sponsor.id).subscribe({
        next: (response: Sponsor) => {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Sponsor Deleted', life: 3000 });
          this.getSponsors();
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => {this.deleteSponsorsDialog = false}
      })
    }
    this.selectedSponsors = null;
  }

  //committee methods
  getCommittees(){
    this.committeeService.getCommitteesByEventId(this.pathId).subscribe({
      next: (response: Committee[]) => {
        this.committees = response;
        this.event.committees = response;
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Loading Failed', life: 3000 }),
      complete: () => {}
    })
  }

  saveCommittee(){
    this.committee = {
      'id': this.committeeForm.get('id').value,
      'firstName': this.committeeForm.get('firstName').value,
      'lastName': this.committeeForm.get('lastName').value,
      'email': this.committeeForm.get('email').value,
      'phone': this.committeeForm.get('phone').value,
      'dob': this.committeeForm.get('dob').value,
      'gender' : this.committeeForm.get('gender').value,
      'cin' : this.committeeForm.get('cin').value,
      'type' : this.committeeForm.get('type').value,
      'event' : this.event
    }
    this.committeeService.saveCommittee(this.committee).subscribe({
      next: (response: Committee) => {
        this.committeeForm.reset();
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Committee Added', life: 3000 });
        this.getCommittees();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.committeeDialog = false
    })
  }

  openNewCommittee(){
    this.committeeDialog = true;
  }

  editCommittee(committee){
    this.committeeForm.get('id').setValue(committee.id);
    this.committeeForm.get('cin').setValue(committee.cin);
    this.committeeForm.get('firstName').setValue(committee.firstName);
    this.committeeForm.get('lastName').setValue(committee.lastName);
    this.committeeForm.get('email').setValue(committee.email);
    this.committeeForm.get('phone').setValue(committee.phone);
    this.committeeForm.get('dob').setValue(new Date(committee.dob));
    this.committeeForm.get('gender').setValue(committee.gender);
    this.committeeForm.get('type').setValue(committee.type);

    this.committeeDialog = true;
  }

  deleteCommittee(committee){
    this.committee = committee;
    this.deleteCommitteeDialog = true;
  }

  deleteSelectedCommittees(){
    this.deleteCommitteesDialog = true;
  }

  confirmDeleteCommittee(){
    this.committeeService.deleteCommittee(this.committee.id).subscribe({
      next: (response: Committee) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Committee Deleted', life: 3000 });
        this.getCommittees();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deleteCommitteeDialog = false
    })
  }

  confirmDeleteCommittees(){
    for(let committee of this.selectedCommittees){
      this.committeeService.deleteCommittee(committee.id).subscribe({
        next: (response: Committee) => {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Committee Deleted', life: 3000 });
          this.getCommittees();
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => {this.deleteCommitteesDialog = false}
      })
    }
    this.selectedCommittees = null;
  }

}
