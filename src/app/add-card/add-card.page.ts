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
    _id: '',
  };

  constructor(
    private navCtrl: NavController,
    private serverH: ServerHandlerService,
    private alert: AlertController
  ) {}

  ngOnInit() {}
  addCardAlert() {
    console.log('deneme');
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
              this.navCtrl.back();
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
        header: 'Kart Ekleme Başarız',
        message: msg,
        buttons: ['Tamam'],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
