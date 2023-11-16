import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private route: Router) { }

  checkLogin():boolean{
    const data=localStorage.getItem('login-info')
    if(data){
      const loginInfo=JSON.parse(data)
      return loginInfo.info

    }
    return false
  }

  successfulLogin(){
    localStorage.setItem('login-info', JSON.stringify({ info: true }));
  }

  logOut(){
    if(localStorage.getItem('login-info')){
      localStorage.removeItem('login-info')
    }
    console.log("çıkış yapıldı")
  }
}
