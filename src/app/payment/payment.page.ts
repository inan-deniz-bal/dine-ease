import { Component, OnInit } from '@angular/core';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { Card } from 'src/types/cardType';
import { AlertController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  cardList: Card[] = [];

  constructor(
    private serverH: ServerHandlerService,
    private alertController: AlertController,
    private route: Router
  ) {}

  ngOnInit() {
    this.serverH.getUserCards().subscribe({
      next: (data: { status: string; data: Card[] }) => {
        console.log('Data:', data);
        this.cardList = data.data;
      },
      error: (error) => {
        this.noCardAlert();
        console.log('Error:', error);
      },
    });
  }

  noCardAlert() {
    this.alertController
      .create({
        header: 'Kart Bulunamadı',
        message: 'Hesabınıza kayıtlı bir kart bulunamadı. Lütfen kart ekleyin.',
        buttons: ['Tamam'],
      })
      .then((alert) => {
        alert.present();
      });
  }

  navigateCardPage() {
    this.route.navigate(['./add-card']);
  }

  deleteCard(card: Card) {
    if (card._id) {
      this.serverH.removeCard(card._id).subscribe({
        next: (data: { status: string }) => {
          console.log(data.status);
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
    }
  }
  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const from = event.detail.from;
    const to = event.detail.to;

    if (from !== to) {
      const movedItem = this.cardList.splice(from, 1)[0];
      this.cardList.splice(to, 0, movedItem);
      console.log(this.cardList);
    }

    event.detail.complete();
  }

  ngOnDestroy() {
    console.log('Payment page destroyed');
  }
}
