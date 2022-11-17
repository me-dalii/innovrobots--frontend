import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CompanyService } from 'src/services/company.service';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/Event';
import { Company } from 'src/models/Company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [MessageService]
})
export class CompanyComponent implements OnInit {

  valCheck: string[] = ['remember'];

  companyForm : FormGroup;

  event : Event;

  constructor(private messageService: MessageService, private router : Router, private companyService: CompanyService,
     private eventService: EventService) { }

  ngOnInit(): void {

    this.getActivatedEvent();


    this.companyForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address : new FormControl(''),
    });
  }

  getActivatedEvent(){
    this.eventService.getActivatedEvent().subscribe(
      (data) => {
        this.event = data;
      }
    )
  }
  
  saveCompany(){
    let company = this.companyForm.value;
    company.event = this.event;
    this.companyService.saveCompany(company).subscribe({
      next: (response: Company) => {
        this.companyForm.reset();
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
