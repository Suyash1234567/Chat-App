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
        localStorage.setItem("Name",userData.name)
        localStorage.setItem("Token","ya29.Glz1BR1g1tauv69B6XzavFo3cFl-Fih-KT3PYRO2FtDw4…38Cbi1D2SU7tnicADHNPedf29k0m-0mn6GAdSwmGa-BJXBOUA")
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