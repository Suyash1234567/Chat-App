import { Component, OnInit } from '@angular/core';
import { CheckCallService } from '../check-call.service';

@Component({
  selector: 'app-twichat',
  templateUrl: './twichat.component.html',
  styleUrls: ['./twichat.component.css']
})
export class TwichatComponent implements OnInit {

  client: any;
  constructor(private service: CheckCallService) { }

  ngOnInit() { 
    // this.callService();
  }

  channels() {
    this.service.fetchChannel(this.channels).subscribe(response => {
      console.log(response);
      // this.client = response;
      // this.service.fetchChannel(response);
    });
  }
}
