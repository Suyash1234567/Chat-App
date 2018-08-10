import { Injectable } from '@angular/core';
import { CanActivate } from '../../node_modules/@angular/router';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthgService implements CanActivate {

  constructor(private route: Router) { }
  canActivate()
  {
    if(!!localStorage.getItem("Token"))
    {
      return true;
    }
    else
    {
    this.route.navigate(['/'])
     return false;
    }
    
  }
}