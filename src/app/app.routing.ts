import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { TwichatComponent } from './twichat/twichat.component';

const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'twichat', component: TwichatComponent },
    { path: '**', component: SigninComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
