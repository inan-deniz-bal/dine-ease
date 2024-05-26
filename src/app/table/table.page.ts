import { Component, OnInit } from '@angular/core';
import { Table } from 'src/types/tableType';
import { Menu } from 'src/interfaces/menu';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { RestaurantByTableService } from 'src/services/restaurant-by-table.service';
import { Order } from 'src/interfaces/order';
import { MakeOrder } from 'src/types/makeOrderType';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  table: Table = {
    tableName: 'QR Masa',
    _id: '',
  };

  selectedRestaurantName = '';

  menu: Menu[] = [];
  constructor(
    private serverH: ServerHandlerService,
    private restByTable: RestaurantByTableService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.table._id = this.restByTable.getSelectedTableID();
    console.log('Masa idsi', this.table._id);
    this.menu = this.restByTable.getResponse().menu;
    this.selectedRestaurantName = this.restByTable.getResponse().restaurantName;
    console.log(
      'MASA ',
      this.restByTable.getResponse().restaurantName,
      this.restByTable.getResponse().menu
    );
  }

  orderItem(order: Order[], date: Date) {
    let totalPrice = 0;
    order.forEach((meal) => {
      totalPrice += meal.mealPrice * meal.mealQuantity;
    });

    if (totalPrice <= 0) {
      this.noOrderAlert();
    } else {
      const newOrder: MakeOrder = {
        orderedMeals: order,
        tableId: this.table._id,
        date: date,
        restaurantName: this.selectedRestaurantName,
        orderStatus: 'active',
        totalPrice: totalPrice,
      };
      console.log('newOrder', newOrder);

      this.serverH.makeOrder(newOrder).subscribe({
        next: (response) => {
          console.log(response.data);
          if (response.data._id) {
            localStorage.setItem('orderID', response.data._id);
            localStorage.setItem(
              'tableID',
              JSON.stringify(response.data.tableId)
            );
          }

          this.navCtrl.navigateRoot(['./home-after-order']);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  onOrderAlert(order: Order[], date: Date) {
    console.log('order', order);
    console.log('date', date);
    this.alertCtrl
      .create({
        header: 'Sipariş Onayı',
        message: 'Siparişinizi onaylıyor musunuz?',
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
              this.orderItem(order, date);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  closeOrder() {
    this.navCtrl.navigateRoot(['./qr']);
  }

  failedAlert() {
    this.alertCtrl
      .create({
        header: 'Sipariş Başarısız',
        message: 'Siparişiniz alınamadı. Lütfen tekrar deneyin.',
        buttons: [
          {
            text: 'Tamam',
            handler: () => {
              this.navCtrl.navigateRoot(['./qr']);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  noOrderAlert() {
    this.alertCtrl
      .create({
        header: 'Sipariş Başarısız',
        message:
          'Siparişinizde herhangi bir ürün bulunmamaktadır. Lütfen ürün ekleyiniz',
        buttons: ['Tamam'],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
