import { Component, OnInit } from '@angular/core';
import { Card } from 'src/types/cardType';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {
  newCard: Card = {
    cardNo: '',
    cardHolder: '',
    cvv: '',
    expirityDate: {
      month: '',
      year: '',
    },
  };

  constructor(
    private navCtrl: NavController,
    private serverH: ServerHandlerService,
    private alert: AlertController
  ) {}

  ngOnInit() {}

  addCardAlert() {
    if (this.isCardValid()) {
      this.alert
        .create({
          header: 'Kartı eklemek istediğinize emin misiniz?',
          message: 'Kart bilgilerinizin doğru olduğundan emin olunuz.',
          buttons: [
            {
              text: 'Evet',
              handler: () => {
                this.addCard();
              },
            },
            {
              text: 'Hayır',
              role: 'cancel',
            },
          ],
        })
        .then((alert) => {
          alert.present();
        });
    }
  }

  addCard() {
    this.serverH.addCard(this.newCard).subscribe({
      next: (data: { status: string; data: Card }) => {
        console.log('Data:', data);
        this.successAlert();
      },
      error: (error) => {
        this.failAlert(error.error.message);
        console.log('Error: oldu', error);
      },
    });
  }

  successAlert() {
    this.alert
      .create({
        header: 'Kart Ekleme Başarılı',
        message: 'Kartınız başarıyla eklendi.',
        buttons: [
          {
            text: 'Tamam',
            handler: () => {
              this.navCtrl.navigateRoot('/home');
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  failAlert(msg: string) {
    this.alert
      .create({
        header: 'Kart Ekleme Başarısız',
        message: msg,
        buttons: ['Tamam'],
      })
      .then((alert) => {
        alert.present();
      });
  }

  isCardValid(): boolean {
    const { cardNo, cardHolder, cvv, expirityDate } = this.newCard;

    if (!/^\d{16}$/.test(cardNo)) {
      this.failAlert(
        'Kart numarası 16 haneli olmalı ve sadece rakamlardan oluşmalıdır.'
      );
      return false;
    }

    const turkishCharRegex = /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/;
    if (!turkishCharRegex.test(cardHolder)) {
      this.failAlert(
        'Kart sahibi sadece harflerden ve boşluklardan oluşmalıdır.'
      );
      return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      this.failAlert('CVV 3 haneli olmalıdır.');
      return false;
    }

    if (
      !/^\d{2}$/.test(expirityDate.month) ||
      !/^\d{4}$/.test(expirityDate.year)
    ) {
      this.failAlert('Son kullanma tarihi doğru formatta değil.');
      return false;
    }

    const currentDate = new Date();
    const expMonth = parseInt(expirityDate.month, 10);
    const expYear = parseInt(expirityDate.year, 10);

    // Ay ve yılın geçerli bir tarih oluşturup oluşturmadığını kontrol et
    if (
      expMonth < 1 ||
      expMonth > 12 ||
      expYear < currentDate.getFullYear() ||
      (expYear === currentDate.getFullYear() &&
        expMonth < currentDate.getMonth() + 1)
    ) {
      this.failAlert('Son kullanma tarihi geçerli bir tarih olmalıdır.');
      return false;
    }

    return true;
  }
}
