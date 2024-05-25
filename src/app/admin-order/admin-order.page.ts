import { Component, OnInit } from '@angular/core';
import { AdminSelectedOrderService } from 'src/services/admin-selected-order.service';
import { MakeOrder } from 'src/types/makeOrderType';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.page.html',
  styleUrls: ['./admin-order.page.scss'],
})
export class AdminOrderPage implements OnInit {
  constructor(
    private selectedOrder: AdminSelectedOrderService,
    private serverH: ServerHandlerService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  tableName: String = '';
  orderDetails: MakeOrder = {
    tableId: '',
    restaurantName: '',
    date: new Date(),
    totalPrice: 0,
    orderedMeals: [],
    orderStatus: '',
  };

  isOrderReady = false;

  ngOnInit() {
    console.log('mergaba');
    console.log(this.selectedOrder.getSelectedOrder());
    this.tableName = this.selectedOrder.getSelectedOrder().tableName;
    this.orderDetails = this.selectedOrder.getSelectedOrder().order;
    if (this.orderDetails.orderStatus === 'ready') {
      this.isOrderReady = true;
    }
  }

  readyOrder() {
    const id = this.orderDetails._id;
    if (id) {
      this.serverH.makeOrderReadyfromRest(id).subscribe({
        next: (response) => {
          console.log(response);
          this.navCtrl.navigateRoot(['./waiter-home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  cancelOrder() {
    const id = this.orderDetails._id;
    if (id) {
      this.serverH.cancelOrder(id, this.orderDetails.tableId).subscribe({
        next: (response) => {
          console.log(response);
          this.navCtrl.navigateRoot(['./waiter-home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onOrderReady() {
    this.alertCtrl
      .create({
        header: 'Sipariş Hazır',
        message: 'Siparişin hazır olduğunu onaylıyor musunuz?',
        buttons: [
          {
            text: 'Hayır',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
          {
            text: 'Evet',
            handler: () => {
              this.readyOrder();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  onOrderCancelled() {
    this.alertCtrl
      .create({
        header: 'Sipariş İptal',
        message: 'Siparişi iptal etmek istediğinize emin misiniz?',
        buttons: [
          {
            text: 'Hayır',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
          {
            text: 'Evet',
            handler: () => {
              this.cancelOrder();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
