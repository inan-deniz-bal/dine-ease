import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { Login } from 'src/classes/login';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/services/login.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private navctrl: NavController,
    private serverSer: ServerHandlerService,
    private menuCtrl: MenuController,
    private loginSer: LoginService
  ) {}

  ngOnInit() {
    //this.loginSer.logOut();
    //this.menuCtrl.enable(false);
  }

  login() {
    this.serverSer.login(new Login(this.username, this.password)).subscribe(
      (response) => {
        console.log('cevap bastırılıyor:', response);

        this.menuCtrl.enable(true);
        this.loginSer.successfulLogin();
        this.navctrl.navigateRoot('/home');
      },
      (error) => {
        if (
          error.status === 401 &&
          error.error.message === 'Invalid email or password'
        ) {
          console.log('Geçersiz e-posta veya şifre');
          // Kullanıcıya uygun bir geri bildirim sağlamak için mesajı göster
        } else {
          console.log('Beklenmeyen bir hata oluştu');
          // Genel hata mesajını kullanıcıya göster
        }
      }
    );
  } /*
  login() {
    const serverResponse = this.serverSer.loginHandler(
      new Login(this.username, this.password)
    );
    if (serverResponse == 'not_match') {
      this.navctrl.navigateForward('/sign-up');
    } else if (serverResponse == 'wrong_pass') {
      this.username = 'Wrong password';
    } else {
      this.menuCtrl.enable(true);
      this.navctrl.navigateRoot('/home');
    }
  }*/
}
