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
  public channel ="CH736d7089e477499682a3df0d9e095fac";
  public tempChannelname ="General";
  public show = 0;
  public loggedInUser= localStorage.getItem("Name");      //to display name of the message sender 
  length: number;
  msgArr = [];
  myAllChannels=[];
  public MyVar: string = "General";
  channelName: string = "";
  sendMsg: string = "";
  allMsg: any = [];                               //ngFor used for showing messages here(using allMsg array)
  defaultName: string="";
  defaultChannelUserId:any="";
  setInt:any;
  message:any;
  searchValue:any;
  channelId:any;
  regEx:any;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {                                    //will show all the message on page initialisation
    // this.checkChannel();
    this.allMessages();
    this.GetAllChannel();                              //Basically to do myAllChannels wala kaam 
    // this.setInt=setInterval(()=>{
    //   this.service.ShowAllMessages().subscribe(res=>{
    //     this.message=res.message;
    //     console.log(this.message)
    //   },
    //   err=>{
    //     console.log(err);
    //   })
    // },1000)
    setInterval(()=>{                                 //to continiously get all messages
      this.allMessages();
    },1000)
  }
  hideMessage(){
    this.searchValue = null;
  }

  GetAllChannel()                                     //gets called on initialisation itself
  {
    this.service.DisplayAllChannel().subscribe(res => {
      this.myAllChannels = res.channels;        //channels here is an array and loop is being run till its length 
      for(let index=0;index<this.myAllChannels.length;index++)    //loop applied TO REMOVE blank spaces channel-name 
      {
        if (this.myAllChannels[index].unique_name==null)
        {
          this.myAllChannels.splice(index,1);                     //(index,1) means array element from index to index+1 will be removed
        }
        
      }
    }),
      err => {
        //alert('3');
        console.log(err);
      }
  }
  // checkChannel()
  // {
  //   this.channelName="Default_Channel_suyash mehrotra";
  //   let flag = false;           //Used as an indicator when channel is found/not found
  //  //Since function was being called befor getting the results set in the variable, so used the code here
  //   this.service.DisplayAllChannel().subscribe(res => {
  //     this.length = res.channels.length;        //channels here is an array and loop is being run till its length 
  //     this.myAllChannels=res.channels;
  //     for (let i = 0; i < this.length; i++) {
  //       if (this.channelName == res.channels[i].unique_name) {  //Checks the given input field with array here
  //         flag = true;
  //         console.log('Channel Found', res.channels[i]); //Shows full details of the channels
  //         this.MyVar = res.channels[i].unique_name;     //MyVar stores the name of the channel
  //         this.tempChannelname = res.channels[i].unique_name;
  //         console.log("Myvar value",this.MyVar);
  //         this.getChannelIdbyName(this.channelName);
  //         break;
  //       }
  //     }

  //     if (flag === false) {
  //       //this.addChannel();
  //       this.service.AddChannel(this.channelName).subscribe(response => {     //Parameter passed cause we are sending(post) so we use this.sendMsg in parameter
  //       },
  //         err => {                                                         //Syntax to find default error(Observable Method)
  //           console.log(err);
  //         },
  //         () => {                                                         //This function is used when service finished sending all the data and we call ShowAllMessage Function here
  //           this.getChannelIdbyName(this.channelName);
  //         });
        
  //     }
  //   }),
  //     err => {
  //       console.log(err);
  //       this.tempChannelname= "Channel not found";
  //     }
    
  

    
  // }

  searchChannels() {                                  //gets triggered through html file
    this.regEx = new RegExp(this.channelName, "i");   //for case insensitive

    let flag = false;           //Used as an indicator when channel is found/not found

    this.service.DisplayAllChannel().subscribe(res => {
      this.length = res.channels.length;        //res.channels here is an array and loop is being run till its length 
      for (let i = 0; i < this.length; i++) {
        if(this.regEx.test(res.channels[i].unique_name)){
        // if (this.channelName == res.channels[i].unique_name) {  //Channel Name is added here via NGMODEL.Checks the given input field with array here
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
  addChannel() {                                                            //gets triggered via html file
    this.loading = true;
    
    if(this.channelName != '')                                             //To prevent adding any channel with a blank name
    {
    for(let i=0;i< this.myAllChannels.length;i++)                          //Checking the channel if it already exist against an array myAllChannels(already contains all the channel info)
    {
        if(this.myAllChannels[i].unique_name == this.channelName)          //this.channelName is added (via NgModel) which checks user input against the array myAllChannels
        {
          alert("Channel name already exists, please select different name.")
          break;                                                           //Break added, otherwise AddChannel() function would have been called
        }
    }
    this.service.AddChannel(this.channelName).subscribe(response => {
      console.log('Channel Added', response);                         //Shows the details of the channel added
      this.GetAllChannel();
    }),
      this.loading = false;
    err => {
      console.log(err);
    }
  }
  else
  {
    alert("Please enter the channel name to create.")
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
    document.getElementById("MyVar_" + str).innerHTML;  //Id formed here is of the form "Myvar_{{MyVar}}" in html. And in str we are passing channel name
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
      console.log("My Channel" + response.sid);
      this.MyVar=myChannelName;
      this.allMessages();
    }),
      err => {
        console.log(err);
      }
  }
  sendMessage() {
    this.loading = true;
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    

    let day= date.getDate();
    let month = date.getMonth() +1;

    let fullDateTime= day+"/"+month+" "+ hour+":"+minute;
    if(this.sendMsg.length >120)
    {
      alert("Maximum message length size is 120");
      this.loading = false;
    }
    else
    {                                 //Concatinating message Username Fulldate time and sending it as a message to twilio.
    this.service.SendMessageToChannel(this.sendMsg + "- "+ this.loggedInUser + " - ("+ fullDateTime +")" , this.channel).subscribe(response => {     //Parameter passed cause we are sending(post) so we use this.sendMsg in parameter
    },                                                                  //loggedInUser used cause local storage value gets updated every time a new person logs in
      err => {                                                         //Syntax to find default error(Observable Method)
        console.log(err);
      },
      () => {                                                         //This function is used when service finished sending all the data and we call ShowAllMessage Function here
        this.allMessages();
      });
    }
  }

  allMessages() {                                                                       //For showing all the messages
    this.service.ShowAllMessagesFromChannel(this.channel).subscribe(response => {              //response stores the data called from service
      this.allMsg = response.messages;                                 //the 'messages' (cause of dot(.)) property gets saved allMsg
      this.loading = false;
      console.log(response.messages);
    });
  }


}