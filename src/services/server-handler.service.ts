import { Injectable } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { Login } from 'src/classes/login';

@Injectable({
  providedIn: 'root',
})
export class ServerHandlerService {
  constructor() {}

  getRestList(): RestList[] {
    const rets: RestList[] = [
      new RestList('Kardeşler Pide Fırını', 40, 20),
      new RestList("Burcu'nun Pastanesi", 4, 2),
    ];
    return rets;
  }

  loginHandler(loginUser:Login){
    const userList:Login[]=[
      new Login("gencayburcu@gmail.com","eyşan"),
      new Login("idb@gmail.com","cesur")
    ]
  }

}
