import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    localStorage.getItem('isLoggedIn')
      ? this.loggedIn.next(true)
      : this.loggedIn.next(false);
    console.log("içerideyiz")
    return this.loggedIn.asObservable();
  }

  login() {
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
  }
}
