import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/services/login.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  name: string = '';
  surname: string = '';
  birthday: string = '';
  e_mail: string = '';
  passowrd: string = '';
  username: string = '';

  constructor(
    private navCtrl: NavController,
    private loginSer: LoginService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  signUp() {
    if (this.username) {
      this.loginSer.successfulLogin();
      this.menuCtrl.enable(true);
      this.navCtrl.navigateRoot('home');
    }
  }
}
