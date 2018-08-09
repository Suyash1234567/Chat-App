import { Component, OnInit } from '@angular/core';
import { CheckCallService } from '../check-call.service';
import { Jsonp } from '../../../node_modules/@angular/http';

@Component({
  selector: 'app-twichat',
  templateUrl: './twichat.component.html',
  styleUrls: ['./twichat.component.css']
})
export class TwichatComponent implements OnInit {

  public newChannel="";
  public txtmsg="";
  grpObj;
  msggrp;
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
        this.grpObj;
      },
    error => {
      console.log(error);
    });
  }

  channelArr=[];
  channeldisplay() {
    this.service.channeldisplay().subscribe(res=>{
      
      for (let index=0;index<res.channels.length;index++)
      {
        this.channelArr[index]=res.channels[index].UniqueName;
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