import { Component, OnInit } from '@angular/core';
import { MakeOrder } from 'src/types/makeOrderType';
import { UpdateCurrentOrderService } from 'src/services/update-current-order.service';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Menu } from 'src/interfaces/menu';
import { Order } from 'src/interfaces/order';
import { AlertController } from '@ionic/angular';
import { RestaurantByTableService } from 'src/services/restaurant-by-table.service';
import { SelectedRestService } from 'src/services/selected-rest.service';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {
  currentOrder: MakeOrder = {
    tableId: '1',
    restaurantName: '1',
    date: new Date(),
    totalPrice: 0,
    orderedMeals: [
      {
        mealName: '1',
        mealPrice: 0,
        mealQuantity: 0,
      },
    ],
    orderStatus: '1',
  };
  menu: Menu[] = [];

  constructor(
    private serverH: ServerHandlerService,
    private navCtrl: NavController,
    private router: Router,
    private updateOrderS: UpdateCurrentOrderService,
    private alertCtrl: AlertController,
    private restByTable: RestaurantByTableService,
    private selectedRest: SelectedRestService
  ) {}

  ngOnInit() {
    this.currentOrder = this.updateOrderS.getCurrentOrder();
    console.log(this.currentOrder);
    this.menu = this.restByTable.getResponse().menu;
    if (this.menu.length == 0) {
      this.menu = this.selectedRest.getSelectedRestaurant().menu;
    }
  }

  onUpdateOrder(order: Order[]) {
    if (order.length == 0) {
      this.alertCtrl
        .create({
          header: 'Sipariş Hatası',
          message: 'Siparişinizde en az bir ürün olmalıdır.',
          buttons: ['Tamam'],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    } else {
      let totalPrice = 0;
      order.forEach((meal) => {
        totalPrice += meal.mealPrice * meal.mealQuantity;
      });
      totalPrice += this.currentOrder.totalPrice.valueOf();
      console.log(totalPrice);

      const newOrder: Order[] = this.currentOrder.orderedMeals.concat(order);
      console.log(newOrder);
      const currentId = this.currentOrder._id;
      if (currentId) {
        this.serverH.updateOrder(currentId, totalPrice, newOrder).subscribe({
          next: (response) => {
            this.navCtrl.navigateRoot(['./home-after-order']);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }

  onOrderAlert(order: Order[]) {
    console.log('order', order);
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
              this.onUpdateOrder(order);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
