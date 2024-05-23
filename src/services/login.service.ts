import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private route: Router) { }

  checkLogin():boolean{
    const data=localStorage.getItem('login-info')
    console.log(data)
    if(data){
      const loginInfo=JSON.parse(data)
      return loginInfo.info

    }
    return false
  }

  successfulLogin(userID:string){
    localStorage.setItem('login-info', JSON.stringify({ info: true }));
    localStorage.setItem('userid',userID)
  }

  getUser():string{
    const userID=localStorage.getItem('userid')
    if(userID){
      return userID
    }
    return ""
  }

  logOut(){
    if(localStorage.getItem('login-info')){
      localStorage.removeItem('login-info')
      localStorage.clear();
    }
    console.log("çıkış yapıldı")
  }
}
