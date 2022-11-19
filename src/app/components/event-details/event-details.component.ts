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
import { Student } from 'src/models/Student';
import { StudentService } from 'src/services/student.service';
import { University } from 'src/enums/University';
import { Teacher } from 'src/models/Teacher';
import { TeacherService } from 'src/services/teacher.service';
import { Company } from 'src/models/Company';
import { CompanyService } from 'src/services/company.service';
import { CustomFileHandlerService } from 'src/services/CustomFileHandler/custom-file-handler.service';

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

  //student
  students: Student[];
  selectedStudents : Student[];
  student : Student;
  studentDialog : boolean;
  deleteStudentDialog: boolean = false;
  deleteStudentsDialog: boolean = false;
  studentForm: FormGroup;

  //Teacher
  teachers: Teacher[];
  selectedTeachers : Teacher[];
  teacher : Teacher;
  teacherDialog : boolean;
  deleteTeacherDialog: boolean = false;
  deleteTeachersDialog: boolean = false;
  teacherForm: FormGroup;

  //Company
  companies: Company[];
  selectedCompanies : Company[];
  company : Company;
  companyDialog : boolean;
  deleteCompanyDialog: boolean = false;
  deleteCompaniesDialog: boolean = false;
  companyForm: FormGroup;

  items: MenuItem[];

  showMenu : boolean;
  showStudent : boolean = false;
  showTeacher : boolean = false;
  showCompany : boolean = false;

  uni = University;
  unis = [];

  logoDialog : boolean;
  deleteLogoDialog : boolean;
  logo_file: any;

  posterDialog : boolean;
  deletePosterDialog : boolean;
  poster_file: any;


  //exportVariables
  studentsCols: any[] = [];
  educatorsCols: any[] = [];
  companiesCols: any[] = [];

  teaserLink : string;
  liveStreamLink : string;

  constructor(private route: ActivatedRoute, 
    private sponsorService: SponsorService, 
    private eventService: EventService, 
    private committeeService: CommitteeService, 
    private messageService: MessageService, 
    private companyService: CompanyService,
    private teacherService: TeacherService, 
    private speakerService: SpeakerService, 
    private studentService: StudentService,
    private chs : CustomFileHandlerService) { }

  ngOnInit(): void {
    this.showMenu = true;
    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.genders = Object.keys(this.gender);
    this.types = Object.keys(this.type);
    this.unis = Object.keys(this.uni);
     
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
      numberOfAllowedStudents: new FormControl(''),
      studentsPrice: new FormControl(''),
      numberOfAllowedTeachers: new FormControl(''),
      teachersPrice: new FormControl(''),
      numberOfAllowedCompanies: new FormControl(''),
      companiesPrice: new FormControl(''),

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

    this.studentForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob : new FormControl(''),
      gender : new FormControl(''),
      university : new FormControl(''),
      grade : new FormControl('')
    });

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

    this.companyForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address : new FormControl(''),
    });


    this.studentsCols = [
      
      { field: 'creationDate', header: 'Creation Date' },
      { field: 'firstName', header: 'First Name', },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'dob', header: 'Date of Birth' },
      { field: 'gender', header: 'Gender' },
      { field: 'dob', header: 'Date of Birth' },
      { field: 'university', header: 'University' },
      { field: 'grade', header: 'Grade', },
    ];

    this.educatorsCols = [
      { field: 'creationDate', header: 'Creation Date' },
      { field: 'firstName', header: 'First Name', },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'dob', header: 'Date of Birth' },
      { field: 'gender', header: 'Gender' },
      { field: 'dob', header: 'Date of Birth' },
      { field: 'university', header: 'University' }
    ];

    this.companiesCols = [
      { field: 'creationDate', header: 'Creation Date' },
      { field: 'name', header: 'Name', },
      { field: 'description', header: 'Description' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'address', header: 'Address' },
    ];

  }

  getEvent() {
    this.eventService.getEventById(this.pathId).subscribe({
      next: (response: Event) => this.event = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Loading Failed', life: 3000 }),
      complete: () => {
        this.getSpeakers();
        this.getCommittees();
        this.getSponsors();
        this.getStudents();
        this.getTeachers();
        this.getCompanies();
        this.teaserLink = this.event.youtubeTeaserLink;
        this.liveStreamLink = this.event.youtubeLiveStreamLink;
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
    this.eventForm.get('numberOfAllowedStudents').setValue(this.event.numberOfAllowedStudents);
    this.eventForm.get('studentsPrice').setValue(this.event.studentsPrice);
    this.eventForm.get('numberOfAllowedTeachers').setValue(this.event.numberOfAllowedTeachers);
    this.eventForm.get('teachersPrice').setValue(this.event.teachersPrice);
    this.eventForm.get('numberOfAllowedCompanies').setValue(this.event.numberOfAllowedCompanies);
    this.eventForm.get('companiesPrice').setValue(this.event.companiesPrice);
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
      'status' : this.event.status,
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

  
  //student methods
  getStudents(){
    this.studentService.getStudentsByEventId(this.pathId).subscribe({
      next: (response: Student[]) => {
        this.students = response;
        this.event.students = response;
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
      complete: () => {}
    })
  }

  saveStudent(){
    this.student = {
      'id': this.studentForm.get('id').value,
      'firstName': this.studentForm.get('firstName').value,
      'lastName': this.studentForm.get('lastName').value,
      'email': this.studentForm.get('email').value,
      'phone': this.studentForm.get('phone').value,
      'dob': this.studentForm.get('dob').value,
      'university': this.studentForm.get('university').value,
      'grade' : this.studentForm.get('grade').value,
      'gender' : this.studentForm.get('gender').value,
      'event' : this.event,
    }
    this.studentService.saveStudent(this.student).subscribe({
      next: (response: Student) => {
        this.studentForm.reset();
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Student Added', life: 3000 });
        this.getStudents();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.studentDialog = false
    })
  }

  openNewStudent(){
    this.studentDialog = true;
  }

  editStudent(student){
    this.studentForm.get('id').setValue(student.id);
    this.studentForm.get('firstName').setValue(student.firstName);
    this.studentForm.get('lastName').setValue(student.lastName);
    this.studentForm.get('email').setValue(student.email);
    this.studentForm.get('phone').setValue(student.phone);
    this.studentForm.get('dob').setValue(new Date(student.dob));
    this.studentForm.get('university').setValue(student.university);
    this.studentForm.get('grade').setValue(student.grade);
    this.studentForm.get('gender').setValue(student.gender);

    this.studentDialog = true;
  }

  deleteStudent(student){
    this.student = student;
    this.deleteStudentDialog = true;
  }

  deleteSelectedStudents(){
    this.deleteStudentsDialog = true;
  }

  confirmDeleteStudent(){
    this.studentService.deleteStudent(this.student.id).subscribe({
      next: (response: Student) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Student Deleted', life: 3000 });
        this.getStudents();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deleteStudentDialog = false
    })
  }

  confirmDeleteStudents(){
    for(let student of this.selectedStudents){
      this.studentService.deleteStudent(student.id).subscribe({
        next: (response: Student) => {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Student Deleted', life: 3000 });
          this.getStudents();
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => {this.deleteStudentsDialog = false}
      })
    }
    this.selectedStudents = null;
  }

  
  //teacher methods
  getTeachers(){
    this.teacherService.getTeachersByEventId(this.pathId).subscribe({
      next: (response: Teacher[]) => {
        this.teachers = response;
        this.event.teachers = response;
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
      complete: () => {}
    })
  }

  saveTeacher(){
    this.teacher = {
      'id': this.teacherForm.get('id').value,
      'firstName': this.teacherForm.get('firstName').value,
      'lastName': this.teacherForm.get('lastName').value,
      'email': this.teacherForm.get('email').value,
      'phone': this.teacherForm.get('phone').value,
      'dob': this.teacherForm.get('dob').value,
      'university': this.teacherForm.get('university').value,
      'gender' : this.teacherForm.get('gender').value,
      'event' : this.event,
    }
    this.teacherService.saveTeacher(this.teacher).subscribe({
      next: (response: Teacher) => {
        this.teacherForm.reset();
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Teacher Added', life: 3000 });
        this.getTeachers();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.teacherDialog = false
    })
  }

  openNewTeacher(){
    this.teacherDialog = true;
  }

  editTeacher(teacher){
    this.teacherForm.get('id').setValue(teacher.id);
    this.teacherForm.get('firstName').setValue(teacher.firstName);
    this.teacherForm.get('lastName').setValue(teacher.lastName);
    this.teacherForm.get('email').setValue(teacher.email);
    this.teacherForm.get('phone').setValue(teacher.phone);
    this.teacherForm.get('dob').setValue(new Date(teacher.dob));
    this.teacherForm.get('university').setValue(teacher.university);
    this.teacherForm.get('gender').setValue(teacher.gender);

    this.teacherDialog = true;
  }

  deleteTeacher(teacher){
    this.teacher = teacher;
    this.deleteTeacherDialog = true;
  }

  deleteSelectedTeachers(){
    this.deleteTeachersDialog = true;
  }

  confirmDeleteTeacher(){
    this.teacherService.deleteTeacher(this.teacher.id).subscribe({
      next: (response: Teacher) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Teacher Deleted', life: 3000 });
        this.getTeachers();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deleteTeacherDialog = false
    })
  }

  confirmDeleteTeachers(){
    for(let teacher of this.selectedTeachers){
      this.teacherService.deleteTeacher(teacher.id).subscribe({
        next: (response: Teacher) => {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Teacher Deleted', life: 3000 });
          this.getTeachers();
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => {this.deleteTeachersDialog = false}
      })
    }
    this.selectedTeachers = null;
  }

  //company methods
  getCompanies(){
    this.companyService.getCompaniesByEventId(this.pathId).subscribe({
      next: (response: Company[]) => {
        this.companies = response;
        this.event.companies = response;
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Loading Failed', life: 3000 }),
      complete: () => {}
    })
  }

  saveCompany(){
    this.company = {
      'id': this.companyForm.get('id').value,
      'name': this.companyForm.get('name').value,
      'description': this.companyForm.get('description').value,
      'phone': this.companyForm.get('phone').value,
      'email': this.companyForm.get('email').value,
      'address': this.companyForm.get('address').value,
      'event' : this.event,
    }
    this.companyService.saveCompany(this.company).subscribe({
      next: (response: Company) => {
        this.teacherForm.reset();
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Company Added', life: 3000 });
        this.getCompanies();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.companyDialog = false
    })
  }

  openNewCompany(){
    this.companyDialog = true;
  }

  editCompany(company){
    this.companyForm.get('id').setValue(company.id);
    this.companyForm.get('name').setValue(company.name);
    this.companyForm.get('description').setValue(company.description);
    this.companyForm.get('email').setValue(company.email);
    this.companyForm.get('phone').setValue(company.phone);
    this.companyForm.get('address').setValue(company.address);

    this.companyDialog = true;
  }

  deleteCompany(company){
    this.company = company;
    this.deleteCompanyDialog = true;
  }

  deleteSelectedCompanies(){
    this.deleteCompaniesDialog = true;
  }

  confirmDeleteCompany(){
    this.companyService.deleteCompany(this.company.id).subscribe({
      next: (response: Company) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Company Deleted', life: 3000 });
        this.getCompanies();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deleteCompanyDialog = false
    })
  }

  confirmDeleteCompanies(){
    for(let company of this.selectedCompanies){
      this.companyService.deleteCompany(company.id).subscribe({
        next: (response: Company) => {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Teacher Deleted', life: 3000 });
          this.getCompanies();
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => {this.deleteCompaniesDialog = false}
      })
    }
    this.selectedCompanies = null;
  }

  toStudent(){
    this.showStudent = true;
    this.showCompany = false;
    this.showTeacher = false;
    this.showMenu = false;
  }
  toEducator(){
    this.showTeacher = true;
    this.showStudent = false;
    this.showCompany = false;
    this.showMenu = false;

  }
  toCompany(){
    this.showCompany = true;
    this.showTeacher = false;
    this.showStudent = false;
    this.showMenu = false;
  }
  backToMenu(){
    this.showMenu = true;
    this.showCompany = false;
    this.showTeacher = false;
    this.showStudent = false;
  }

  //logo
  addLogo(){
    this.logoDialog = true;
  }

  onSelectLogo(event){
    this.logo_file = event.files[0];
    if(this.logo_file.size < 10000000){
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Ficher selectionneé'});
    }else{
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Too large'});
    }
  }

  onRemoveLogo(){
    this.logo_file = null;
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Removed'});
  }

  saveLogo(){
    const formData: FormData = new FormData();
    //formData.append('logo_file', null, null);
    if (this.logo_file != null) {
      formData.append('logo_file', this.logo_file, this.logo_file?.name);
    }
    console.log(formData)
    this.eventService.saveLogo(this.event.id, formData).subscribe({
      next: (response: Event) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event Logo updated', life: 3000 });
        this.getEvent();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.logoDialog = false
    })
  }

  deleteLogo(){
    this.deleteLogoDialog = true;
  }

  confirmDeleteLogo(){
    this.eventService.deleteLogo(this.event.id).subscribe({
      next: (response: Event) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event Logo deleted', life: 3000 });
        this.getEvent();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deleteLogoDialog = false
    })

  }

  //poster
  addPoster(){
    this.posterDialog = true;
  }

  onSelectPoster(event){
    this.poster_file = event.files[0];
    if(this.poster_file.size < 10000000){
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Poster Uploaded'});
    }else{
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Too large'});
    }
  }
  
  onRemovePoster(){
    this.poster_file = null;
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Removed'});
  }

  savePoster(){
    const formData: FormData = new FormData();
    if (this.poster_file != null) {
      formData.append('poster_file', this.poster_file, this.poster_file?.name);
    }
    this.eventService.savePoster(this.event.id, formData).subscribe({
      next: (response: Event) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event Poster added', life: 3000 });
        this.getEvent();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.posterDialog = false
    })
  }

  deletePoster(){
    this.deletePosterDialog = true;
  }

  confirmDeletePoster(){
    this.eventService.deletePoster(this.event.id).subscribe({
      next: (response: Event) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event Poster deleted', life: 3000 });
        this.getEvent();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.deletePosterDialog = false
    })

  }

  //teaser
  saveTeaser(){

    //check if link does contain the word embed
    if(this.teaserLink.includes("embed")){
      this.eventService.saveTeaser(this.event.id, this.teaserLink).subscribe({
        next: (response: any) => {
          console.log(response.link);
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event Teaser Link Saved', life: 3000 });
          this.event.youtubeTeaserLink = response.link;
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => this.teaserLink = this.event.youtubeTeaserLink
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'NOT EMBED', detail: 'Please Make the youtube link embed', life: 3000 });
    }

   
  }

  resetTeaser(){
    this.eventService.resetTeaser(this.event.id).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event Teaser Deleted', life: 3000 });
        this.event.youtubeTeaserLink = null;
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.teaserLink = this.event.youtubeTeaserLink
    })

  }


  //liveStream
  saveLiveStream(){

    //check if link does contain the word embed
    if(this.liveStreamLink.includes("embed")){
      this.eventService.saveLiveStream(this.event.id, this.liveStreamLink).subscribe({
        next: (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event LiveStream Link Saved', life: 3000 });
          this.event.youtubeLiveStreamLink = response.link;
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
        },
        complete: () => this.liveStreamLink = this.event.youtubeLiveStreamLink
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'NOT EMBED', detail: 'Please Make the youtube link embed', life: 3000 });
    }

   
  }

  resetLiveStream(){
    this.eventService.resetLiveStream(this.event.id).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Event LiveStream Deleted', life: 3000 });
        this.event.youtubeLiveStreamLink = null;
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed', life: 3000 });
      },
      complete: () => this.liveStreamLink = this.event.youtubeLiveStreamLink
    })

  }



}
