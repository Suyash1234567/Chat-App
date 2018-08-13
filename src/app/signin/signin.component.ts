import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { CheckCallService } from '../check-call.service';
import { Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  title="My Chat";
  // selectedPic="https://zaggolenews.files.wordpress.com/2017/12/social-media-1806995_1280.png?w=918";
  constructor(private socialAuthService: AuthService, private service: CheckCallService, private routes: Router) { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    // else if (socialPlatform == "linkedin") {
    //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    // }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        localStorage.setItem('key', JSON.stringify(userData));
        console.log(socialPlatform + " sign in data : ", userData);
        localStorage.setItem("Name",userData.name);
        localStorage.setItem("Token",userData.token);
        console.log("hey"+userData.token);
        var resp = this.service.getInfo();
        resp.subscribe(data => console.log(data));
        this.routes.navigate(['twichat']);
        // Now sign-in with userData
        // ...

      }
    );
  }

  ngOnInit() {
  }

}