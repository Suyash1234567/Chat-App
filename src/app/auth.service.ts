import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { UserDetails } from './user.details';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    User = new UserDetails();
    httpOptions = {
        headers: new HttpHeaders({                  //In services Headers are reqd for Authorization
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic QUNiODU4NTBiZGE4MDAyYzBlNmUxMzc2NGUzZjExMWJlNTpiOWRmODVlMDQ3MjFmMjNkZmU1NjU0NjZmYjI3M2M4Ng=='
        })
    };

    UserName: string = 'ACb85850bda8002c0e6e13764e3f111be5';  //Api Structure
    Password: string = 'b9df85e04721f23dfe565466fb273c86';
    ServiceId: string = 'IS428c9c766b8b412abc1d0545f6019e59';
    url = 'https://chat.twilio.com/v2/Services'
    constructor(private http: HttpClient) {                     //Http Client helps us in returning services(get,post)
        this.User = JSON.parse(localStorage.getItem("key"));        //stores user detail in key onject while signing in. So we fetch details in 'key'

    }
    SetData(): Observable<any> {
        return this.http.post(this.url, 'FriendlyName=Glenn Jacobs', this.httpOptions);
    }
    CreateChannel(): Observable<any> {
        return this.http.post('https://chat.twilio.com/v2/Services/IS428c9c766b8b412abc1d0545f6019e59/Channels', 'UniqueName=General', this.httpOptions);       //to create general channel
    }
    DisplayAllChannel(): Observable<any> {
        return this.http.get('https://chat.twilio.com/v2/Services/IS428c9c766b8b412abc1d0545f6019e59/Channels', this.httpOptions);
    }
    AddChannel(str): Observable<any> {     //here we are sending data in 'str' which will be recieved in 'this.channelname' in 'twichat.component.ts' 
        return this.http.post('https://chat.twilio.com/v2/Services/IS428c9c766b8b412abc1d0545f6019e59/Channels', 'UniqueName=' + str, this.httpOptions);
    }

    SendMessage(str): Observable<any> {
        return this.http.post('https://chat.twilio.com/v2/Services/IS428c9c766b8b412abc1d0545f6019e59/Channels/CH9da029d2483b45f1b0ae2e32b5256348/Messages', 'ChannelSid=CH9da029d2483b45f1b0ae2e32b5256348&ServiceSid=IS428c9c766b8b412abc1d0545f6019e59&From=' + this.User.email + '&Body=' + str, this.httpOptions);
    }
    ShowAllMessages(): Observable<any> {
        return this.http.get('https://chat.twilio.com/v2/Services/IS428c9c766b8b412abc1d0545f6019e59/Channels/CH9da029d2483b45f1b0ae2e32b5256348/Messages', this.httpOptions);
    }

}



