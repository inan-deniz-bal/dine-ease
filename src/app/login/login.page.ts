import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private navctrl: NavController) {}

  ngOnInit() {}

  login() {
    console.log(this.username);
    this.navctrl.navigateRoot('home')
  }
}
