import { Component, OnInit } from '@angular/core';
import { CheckCallService } from '../check-call.service';


@Component({
  selector: 'app-twichat',
  templateUrl: './twichat.component.html',
  styleUrls: ['./twichat.component.css']
})
export class TwichatComponent implements OnInit {
  
  msggrp;
  public newChannel="";
  public txtmsg="";
  
  constructor(private service: CheckCallService) { }

  ngOnInit() { 
    // this.callService();
  }

  channels() {
    // this.service.fetchChannel().subscribe(response => {
    //   console.log(response);
      // this.client = response;
      this.service.fetchChannel(this.newChannel).subscribe(response =>{
        console.log(response);
        console.log("New Channel Created");
 
      },
    error => {
      console.log(error);
    });
  }

  channelArr=[];
  channeldisplay() {
    this.service.channeldisplay().subscribe(response=>{
      
      for (let index=0;index<response.channels.length;index++)
      {
        this.channelArr[index]=response.channels[index].UniqueName;
      }
    },
  err=> {
    console.log(err);
  })
  }

  sndmsg() 
  {    
  this.service.entermessage(this.txtmsg).subscribe(response=>{   
    this.msggrp=response.body;   
    console.log(this.msggrp);    
  })  
  }
}