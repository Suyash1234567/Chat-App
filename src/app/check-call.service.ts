import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class CheckCallService {
  url: string = "https://chat.twilio.com/v2/Services";
  channel: string = "https://chat.twilio.com/v2/Services/ISace8ae745b2240f6b2becebd441ef2c2/Channels";
  serviceid: string = "ISace8ae745b2240f6b2becebd441ef2c2";
  chid: string = "CH04cfa8bf28b14f38b950a81265081445";
  constructor(private http: HttpClient) { }

  getInfo(): Observable<any> {
    const body = new HttpParams().set('FriendlyName', 'Chatsuyash');
    return this.http.post(this.url, body.toString(), httpOptions);
  }

  fetchChannel(nchannel): Observable<any> {

    return this.http.post(this.channel, "UniqueName=" + nchannel, httpOptions);
  }
  entermessage(message): Observable<any> {
    return this.http.post("https://chat.twilio.com/v2/Services/" + this.serviceid + "/Channels/" + this.chid +
      "/Mmessages", "ChannelSid=" + this.chid + "&ServiceSid=" + this.serviceid + "&Body=" + message, httpOptions);
  }
  channeldisplay(): Observable<any> {
    return this.http.get(this.channel, httpOptions).pipe(map(data => data));
  }

}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic QUNiODU4NTBiZGE4MDAyYzBlNmUxMzc2NGUzZjExMWJlNTpiOWRmODVlMDQ3MjFmMjNkZmU1NjU0NjZmYjI3M2M4Ng=='
  })
}