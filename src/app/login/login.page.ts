import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { Login } from 'src/classes/login';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/services/login.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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
    private loginSer: LoginService,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.logout();
    //this.loginSer.logOut();
    //this.menuCtrl.enable(false);
  }

  login() {
    this.serverSer.login(new Login(this.username, this.password)).subscribe({
      next: (response) => {
        console.log('cevap bastırılıyor:', response);

        this.menuCtrl.enable(true);
        this.loginSer.successfulLogin(response.data.userid);
        this.authService.login();
        this.navctrl.navigateRoot('/home');
      },
      error: (error) => {
        if (
          error.status === 401 &&
          error.error.message === 'Invalid email or password'
        ) {
          console.log('Geçersiz e-posta veya şifre');
          this.wrongPasswordAlert();
          // Kullanıcıya uygun bir geri bildirim sağlamak için mesajı göster
        } else {
          console.log('Kullanıcı bulunamadı!');
          this.noUserAlert();
          // Genel hata mesajını kullanıcıya göster
        }
      },
    });
  }
  async noUserAlert() {
    const alert = await this.alertController.create({
      header: 'Böyle bir kullanıcı bulunamadı!',
      message: 'Hesabınız bulunmamakta, kayıt olmak ister misiniz?',
      buttons: [
        {
          text: 'Evet',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/sign-up']);
            this.forwardMail();
          },
        },
        { role: 'cancel', text: 'Hayır' },
      ],
    });
    await alert.present();
  }

  async wrongPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Geçersiz e-posta veya şifre!',
      buttons: ['Tamam'],
    });
    await alert.present();
  }
  forwardMail() {
    localStorage.setItem('mail', this.username);
  }
}
