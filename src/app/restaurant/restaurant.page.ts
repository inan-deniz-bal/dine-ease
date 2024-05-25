import { Component, OnInit } from '@angular/core';
import { SelectedRestService } from 'src/services/selected-rest.service';
import { NavController } from '@ionic/angular';
import { Order } from 'src/interfaces/order';
import { CurrentMenuService } from 'src/services/current-menu.service';
import { ServerServiceService } from 'src/services/server-service.service';
import { Restaurant } from 'src/types/restaurantType';
import { Table } from 'src/types/tableType';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { AlertController } from '@ionic/angular';
import { MakeOrder } from 'src/types/makeOrderType';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  selectedRestaurant: Restaurant = {
    name: '',
    address: '',
    menu: [],
    tableList: [],
    totalCapacity: 0,
    customerCount: 0,
  };
  /*selectedRestaurant: SelectedRestaurant = {
    name: '',
    rate: '',
  };*/

  constructor(
    private selectedRest: SelectedRestService,
    private navCtrl: NavController,
    private serverSer: ServerServiceService,
    private curMen: CurrentMenuService,
    private serverH: ServerHandlerService,
    private alertCtrl: AlertController
  ) {}
  clicked = false;

  showOrderComponent = false;
  selectedTable: Table = {
    _id: '',
    tableName: '',
    orders: [
      {
        date: new Date(),
        customerId: '',
        status: '',
      },
    ],
  };

  ngOnInit() {
    this.selectedRestaurant = this.selectedRest.getSelectedRestaurant();
    console.log(this.selectedRestaurant);
    if (this.selectedRestaurant.name == '') {
      this.navCtrl.navigateRoot(['./home']);
    }
    this.curMen.setMenu(this.selectedRestaurant.menu);
  }
  showOrder(table: Table) {
    console.log(table);
    this.selectedTable = table;
    this.showOrderComponent = !this.showOrderComponent;
  }

  orderItem(order: Order[], date: Date) {
    const offset = 3 * 60;
    const gmt3Date = new Date(date.getTime() + offset * 60 * 1000);
    let totalPrice = 0;
    order.forEach((meal) => {
      totalPrice += meal.mealPrice * meal.mealQuantity;
    });

    console.log('hey ', order);
    console.log('masa', this.selectedTable);
    const newOrder: MakeOrder = {
      orderedMeals: order,
      tableId: this.selectedTable._id,
      date: gmt3Date,
      restaurantName: this.selectedRestaurant.name,
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
}
