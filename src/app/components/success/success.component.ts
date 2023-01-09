import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/models/Sponsor';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  sponsors : Sponsor[];


  constructor() { }

  ngOnInit(): void {
  }

}
