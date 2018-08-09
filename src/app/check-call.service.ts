import { Injectable } from '@angular/core';
import { HttpHeaders , HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class CheckCallService {
  url : string="https://chat.twilio.com/v2/Services";
  serviceid:string = "IS428c9c766b8b412abc1d0545f6019e59";  
  chid:string = "CH54f5535ce1ed4edc96d5f489ba368f09";
  

  channel : string = "https://chat.twilio.com/v2/Services/IS428c9c766b8b412abc1d0545f6019e59/Channels";

  constructor(private http: HttpClient ) { }

  getInfo():Observable<any>{
    const body = new HttpParams().set('FriendlyName','Chat');
    return this.http.post(this.url,body.toString(),httpOptions);
  }

  fetchChannel(nchannel):Observable<any>{
    
    return this.http.post(this.channel,"UniqueName="+nchannel,httpOptions);
  }
  entermessage(message): Observable<any> {   
    return this.http.post("https://chat.twilio.com/v2/Services/" + this.serviceid+"/Channels/"+this.chid+
    "/Mmessages","ChannelSid="+this.chid+"&ServiceSid="+this.serviceid+"&Body="+message,httpOptions);  
  }
  channeldisplay():Observable<any>{
    return this.http.get(this.channel,httpOptions).pipe(map(data => data));
  }

}
  const httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic QUNiODU4NTBiZGE4MDAyYzBlNmUxMzc2NGUzZjExMWJlNTpiOWRmODVlMDQ3MjFmMjNkZmU1NjU0NjZmYjI3M2M4Ng=='
    })
  }