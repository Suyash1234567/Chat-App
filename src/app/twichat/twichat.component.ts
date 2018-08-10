import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth.service';
import { Router } from '../../../node_modules/@angular/router';



@Component({
  selector: 'app-twichat',
  templateUrl: './twichat.component.html',
  styleUrls: ['./twichat.component.css']
})
export class TwichatComponent implements OnInit {

  public loading = false;
  msggrp;
  public newChannel = "";
  public txtmsg = "";
  length: number;
  msgArr = [];
  MyVar: string;
  channelName: string = "";
  sendMsg: string = "";
  allMsg: any = [];                               //ngFor used for showing messages here(using allMsg array)
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {                                    //will show all the message on page initialisation
    this.allMessages();
  }

  searchChannels() {
    let flag = false;           //Used as an indicator when channel is found/not found

    this.service.DisplayAllChannel().subscribe(res => {
      this.length = res.channels.length;        //channels here is an array and loop is being run till its length 
      for (let i = 0; i < this.length; i++) {
        if (this.channelName == res.channels[i].unique_name) {  //Checks the given input field with array here
          flag = true;
          console.log('Channel Found', res.channels[i]); //Shows full details of the channels
          this.MyVar = res.channels[i].unique_name;     //MyVar stores the name of the channel
          break;
        }
      }

      if (flag === false) {
        this.MyVar = "Channel not found";
        console.log("Searched Group not found");
      }
    }),
      err => {
        console.log(err);
      }
  }
  addChannel() {
    this.loading = true;
    this.service.AddChannel(this.channelName).subscribe(response => {
      console.log('Channel Added', response);                         //Shows the details of the channel added
    }),
      this.loading = false;
    err => {
      console.log(err);
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['signin']);
  }
  getIdMember(str) {
    document.getElementById("MyVar_" + str).innerHTML;
    this.service.getChannelId(document.getElementById("MyVar_" + str).innerHTML
    ).subscribe(response => {
      console.log('Channel Id Recieved', response);
    }),
      err => {
        console.log(err);
      }
  }
  sendMessage() {
    this.loading = true;
    this.service.SendMessage(this.sendMsg).subscribe(response => {     //Parameter passed cause we are sending(post) so we use this.sendMsg in parameter
    },
      err => {                                                         //Syntax to find default error(Observable Method)
        console.log(err);
      },
      () => {                                                         //This function is used when service finished sending all the data and we call ShowAllMessage Function here
        this.allMessages();
      });
  }

  allMessages() {
    this.service.ShowAllMessages().subscribe(response => {              //response stores the data called from service
      this.allMsg = response.messages;                                 //the 'messages' (cause of dot(.)) property gets saved allMsg
      this.loading = false;
      console.log(response.messages);
    });
  }
}