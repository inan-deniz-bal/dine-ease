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
  constructor(
    private serverH: ServerHandlerService,
    private alertController: AlertController,
    private route: Router
  ) {}
  cardList: Card[] = [];

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

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
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
}
