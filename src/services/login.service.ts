import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

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
}
