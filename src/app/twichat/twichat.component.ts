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
  public channel ="";
  public tempChannelname ="";
  public show = 0;
  length: number;
  msgArr = [];
  myAllChannels=[];
  MyVar: string;
  channelName: string = "";
  sendMsg: string = "";
  allMsg: any = [];                               //ngFor used for showing messages here(using allMsg array)
  defaultName: string="";
  defaultChannelUserId:any="";
  setInt:any;
  message:any;
  searchValue:any;
  channelId:any;
  variable=localStorage.getItem("Name");
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {                                    //will show all the message on page initialisation
    this.checkChannel();
    // //this.allMessages();
    // this.setInt=setInterval(()=>{
    //   this.service.ShowAllMessages().subscribe(res=>{
    //     this.message=res.message;
    //     console.log(this.message)
    //   },
    //   err=>{
    //     console.log(err);
    //   })
    // },1000)
    setInterval(()=>{
      this.allMessages();
    },1000)
  }
  hideMessage(){
    this.searchValue = null;
  }


  checkChannel()
  {
    this.channelName="Default_Channel_suyash mehrotra";
    let flag = false;           //Used as an indicator when channel is found/not found
   //Since function was being called befor getting the results set in the variable, so used the code here
    this.service.DisplayAllChannel().subscribe(res => {
      this.length = res.channels.length;        //channels here is an array and loop is being run till its length 
      this.myAllChannels=res.channels;
      for (let i = 0; i < this.length; i++) {
        if (this.channelName == res.channels[i].unique_name) {  //Checks the given input field with array here
          flag = true;
          console.log('Channel Found', res.channels[i]); //Shows full details of the channels
          this.MyVar = res.channels[i].unique_name;     //MyVar stores the name of the channel
          this.tempChannelname = res.channels[i].unique_name;
          console.log("Myvar value",this.MyVar);
          this.getChannelIdbyName(this.channelName);
          break;
        }
      }

      if (flag === false) {
        //this.addChannel();
        this.service.AddChannel(this.channelName).subscribe(response => {     //Parameter passed cause we are sending(post) so we use this.sendMsg in parameter
        },
          err => {                                                         //Syntax to find default error(Observable Method)
            console.log(err);
          },
          () => {                                                         //This function is used when service finished sending all the data and we call ShowAllMessage Function here
            this.getChannelIdbyName(this.channelName);
          });
        
      }
    }),
      err => {
        console.log(err);
        this.tempChannelname= "Channel not found";
      }
    
  

    
  }

  searchChannels() {
    let flag = false;           //Used as an indicator when channel is found/not found

    this.service.DisplayAllChannel().subscribe(res => {
      this.length = res.channels.length;        //channels here is an array and loop is being run till its length 
      for (let i = 0; i < this.length; i++) {
        if (this.channelName == res.channels[i].unique_name) {  //Checks the given input field with array here
          flag = true;
          //alert('1');
          console.log('Channel Found', res.channels[i]); //Shows full details of the channels
          this.MyVar = res.channels[i].unique_name;     //MyVar stores the name of the channel
          this.tempChannelname = res.channels[i].unique_name;
          break;
        }
      }

      if (flag === false) {
        this.MyVar = "Channel not found";
        this.tempChannelname= "Channel not found";
        console.log("Searched Group not found");
      }
    }),
      err => {
        //alert('3');
        console.log(err);
        this.tempChannelname= "Channel not found";
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
  ShowHide(num){
    if(num ==1)
      this.show=1;
    else
      this.show=0;
  }

  getIdMember(str) {
    document.getElementById("MyVar_" + str).innerHTML;
    this.service.getChannelId(document.getElementById("MyVar_" + str).innerHTML
    ).subscribe(response => {
      console.log('Channel Id Recieved', response);
      this.channel=response.sid;
      console.log("My Channel" + response.sid)
      this.allMessages();
    }),
      err => {
        console.log(err);
      }
  }
  getChannelIdbyName(myChannelName) {
    //document.getElementById("MyVar_" + str).innerHTML;
    this.service.getChannelId(myChannelName
    ).subscribe(response => {
      console.log('Channel Id Recieved', response);
      this.channel=response.sid;
      console.log("My Channel" + response.sid)
      this.allMessages();
    }),
      err => {
        console.log(err);
      }
  }
  sendMessage() {
    this.loading = true;
    this.service.SendMessageToChannel(this.sendMsg, this.channel).subscribe(response => {     //Parameter passed cause we are sending(post) so we use this.sendMsg in parameter
    },
      err => {                                                         //Syntax to find default error(Observable Method)
        console.log(err);
      },
      () => {                                                         //This function is used when service finished sending all the data and we call ShowAllMessage Function here
        this.allMessages();
      });
  }

  allMessages() {
    this.service.ShowAllMessagesFromChannel(this.channel).subscribe(response => {              //response stores the data called from service
      this.allMsg = response.messages;                                 //the 'messages' (cause of dot(.)) property gets saved allMsg
      this.loading = false;
      console.log(response.messages);
    });
  }


}