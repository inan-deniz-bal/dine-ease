import { Component, OnInit } from '@angular/core';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';
import { Router } from '@angular/router';
import { Table } from 'src/types/tableType';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { Order } from 'src/interfaces/order';
import { TempOrder } from 'src/types/tempOrderType';
import { WaiterPaymentService } from 'src/services/waiter-payment.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

import { slideInFromLeftAnimation } from 'src/animations/animation';
import { slideInFromRightAnimation } from 'src/animations/animation2';
import { slideOutToRightAnimation } from 'src/animations/amination3';
@Component({
  selector: 'app-waiter-table',
  templateUrl: './waiter-table.page.html',
  styleUrls: ['./waiter-table.page.scss'],
})
export class WaiterTablePage implements OnInit {
  constructor(
    private waiterTable: WaiterTableHandlerService,
    private serverH: ServerHandlerService,
    private route: Router,
    private waiterP: WaiterPaymentService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}
  currentOrder: Order[] = [];
  paidOrders: Order[] = [];

  isPageDisabled = false;

  totalLeft = 0;
  totalPaid = 0;
  table: Table = {
    tableName: '',
    _id: '',
    orders: [
      {
        date: new Date(),
        currentOrder: '',
        customerId: '',
        status: '',
      },
    ],
  };
  ordersId: string[] = [];
  currentFee = 0;

  ngOnInit() {
    this.table = this.waiterTable.getTable();
    console.log('table id', this.table._id);
    this.table.orders.map((order) => {
      this.ordersId.push(order.currentOrder);
    });
    console.log('order idler', this.ordersId);
    this.serverH.checkTempOrder(this.ordersId).subscribe({
      next: (response) => {
        console.log('geçerli sipariş: ', response.data);
        this.waiterP.setTempOrder(response.data);
        this.currentOrder = response.data.orderedMeals;

        this.currentOrder.forEach((meal) => {
          this.totalLeft += meal.mealPrice * meal.mealQuantity;
        });

        this.paidOrders = response.data.paidMeals;

        this.paidOrders.forEach((meal) => {
          this.totalPaid += meal.mealPrice * meal.mealQuantity;
        });
      },
      error: (error) => {
        this.isPageDisabled = true;
        this.alertCtrl
          .create({
            header: 'Hata',
            message: 'Sipariş bulunamadı.',
            buttons: [
              {
                text: 'Tamam',
                handler: () => {
                  this.navCtrl.navigateRoot(['./waiter-home']);
                },
              },
            ],
          })
          .then((alertEl) => {
            alertEl.present();
          });

        console.log(error);
      },
    });
  }

  takePayment() {
    this.navCtrl.navigateRoot(['./waiter-take-payment']);
  }

  onCloseTableAlert() {
    this.alertCtrl
      .create({
        header: 'Masayı Kapat',
        message: 'Masa kapatmak istediğinizden emin misiniz?',
        buttons: [
          {
            text: 'Hayır',
            role: 'cancel',
          },
          {
            text: 'Evet',
            handler: () => {
              this.closeTable();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  closeTable() {
    console.log('toplam kalan', this.totalLeft);
    if (this.totalLeft == 0) {
      const tableId = this.table._id;
      const currentOrderid = this.waiterP
        .getTempOrder()
        .currentOrderId.toString();
      const tempOrderId = this.waiterP.getTempOrder()._id;
      if (tableId && currentOrderid && tempOrderId) {
        this.serverH.closeOrder(currentOrderid, tableId).subscribe({
          next: (response) => {
            console.log('ilk response', response);
            this.serverH.deleteTempOrder(tempOrderId).subscribe({
              next: (response2) => {
                console.log('temp order silme response', response2);
                this.navCtrl.navigateRoot(['./waiter-home']);
              },
              error: (error) => {
                console.log(error);
              },
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    } else {
      this.alertCtrl
        .create({
          header: 'Hata',
          message:
            'Masada ödemesi alınmamış ürünler var. Lütfen ödemelerini alın!',
          buttons: [
            {
              text: 'Tamam',
            },
          ],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
    //eğer kalan para sıfırsa borç kapanır
  }
  navHome() {
    this.navCtrl.navigateRoot(['./waiter-home']);
  }
}
