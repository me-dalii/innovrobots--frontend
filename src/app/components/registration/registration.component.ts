import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  valCheck: string[] = ['remember'];

  password!: string;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  toStudent(){
    this.router.navigate(['/registration/student']);
  }

  toEducator(){
    this.router.navigate(['/registration/educator']);
    
  }

  toCompany(){
    this.router.navigate(['/registration/company']);
    
  }

}
