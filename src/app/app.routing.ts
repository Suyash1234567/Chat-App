import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { TwichatComponent } from './twichat/twichat.component';
import { AuthgService } from './authg.service';

const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'twichat', component: TwichatComponent, canActivate: [AuthgService] },
    { path: '', component: SigninComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

