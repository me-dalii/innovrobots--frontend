import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-previous-editions',
  templateUrl: './previous-editions.component.html',
  styleUrls: ['./previous-editions.component.scss'],
  providers: [MessageService]

})
export class PreviousEditionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

}
