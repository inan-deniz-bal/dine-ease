import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/services/login.service';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Customer } from 'src/interfaces/customer';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { CustomerTypeService } from 'src/services/customer-type.service';
import { AuthService } from 'src/services/auth.service';

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
  password: string = '';
  username: string = '';

  errors: string[] = [];

  constructor(
    private navCtrl: NavController,
    private loginSer: LoginService,
    private menuCtrl: MenuController,
    private alert: AlertController,
    private server: ServerHandlerService,
    private customerType: CustomerTypeService,
    private auth:AuthService
  ) {}

  ngOnInit() {
    this.getMailFromLocal();
  }

  signUp() {
    if (this.username) {
      this.menuCtrl.enable(true);
      this.checkErrors();
      //this.navCtrl.navigateRoot('home');

      //this.customerType.setCustomerB()
    }
  }
  getMailFromLocal() {
    const mail = localStorage.getItem('mail');
    if (mail != null) {
      this.e_mail = mail;
    }
  }

  checkLength() {
    if (
      this.name.length > 0 &&
      this.surname.length > 0 &&
      this.birthday.length > 0 &&
      this.e_mail.length > 0 &&
      this.password.length > 0 &&
      this.username.length > 0
    ) {
      return true;
    } else {
      this.errors.push('Lütfen bütün boşlukları doldurun!');
      return false;
    }
  }
  checkMail(): boolean {
    if (
      this.e_mail.length > 0 &&
      this.e_mail.includes('@') &&
      this.e_mail.includes('.com')
    ) {
      return true;
    } else {
      this.errors.push('Geçerli bir mail adresi girin!');
      return false;
    }
  }

  checkPassword(): boolean {
    if (this.password.length >= 8) {
      return true;
    } else {
      this.errors.push('Şifreniz en az 8 karakter olmalıdır!');
      return false;
    }
  }

  checkErrors() {
    if (this.checkLength() && this.checkMail() && this.checkPassword()) {
      const user: Customer = {
        name: this.name + ' ' + this.surname,
        email: this.e_mail,
        password: this.password,
        birthday: this.birthday,
        username: this.username,
        userType: 'Customer',
      };
      this.server.signUp(user).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.loginSer.successfulLogin(response.data.userid);
            this.customerType.setCustomerB();
            this.auth.login();
            this.alert
              .create({
                header: 'Başarılı',
                message: 'Kaydınız başarıyla oluşturuldu!',
                buttons: [
                  {
                    text: 'Tamam',
                    handler: () => {
                      this.navCtrl.navigateRoot('/home');
                    },
                  },
                ],
              })
              .then((alertEl) => alertEl.present());
          }
        },
        error: (error) => {
          if (error.status === 401) {
            console.log('Kullanıcı zaten kayıtlı.');
            this.alert
              .create({
                header: 'Hata',
                message: 'Kullanıcı zaten kayıtlı!',
                buttons: ['Tamam'],
              })
              .then((alertEl) => alertEl.present());
          } else {
            console.log('Beklenmeyen bir hata oluştu:', error);
            this.alert
              .create({
                header: 'Hata',
                message: 'Beklenmeyen bir hata oluştu, lütfen tekrar deneyin!',
                buttons: ['Tamam'],
              })
              .then((alertEl) => alertEl.present());
          }
        },
      });
    } else {
      this.alert
        .create({
          header: 'Hata',
          message: this.errors.join('\n'),
          buttons: ['Tamam'],
        })
        .then((alertEl) => alertEl.present());
      this.errors = [];
    }
  }
}
