import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-messageviewer',
  templateUrl: './messageviewer.component.html',
  styleUrls: ['./messageviewer.component.scss']
})
export class MessageviewerComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

}
