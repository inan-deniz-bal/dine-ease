import { Component, OnInit } from '@angular/core';
import { SelectedRestService } from 'src/services/selected-rest.service';
import { NavController } from '@ionic/angular';
import { Order } from 'src/interfaces/order';
import { CurrentMenuService } from 'src/services/current-menu.service';
import { ServerServiceService } from 'src/services/server-service.service';
import { Restaurant } from 'src/types/restaurantType';
import { Table } from 'src/types/tableType';
import { ServerHandlerService } from 'src/services/server-handler.service';
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
    private curMen: CurrentMenuService
  ) {}
  clicked = false;

  showOrderComponent = false;
  selectedTable: Table = {
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

  orderItem(order: Order[]) {
    console.log('hey ', order);
    this.navCtrl.navigateForward(['./home-after-order']);
    //this.serverSer.orderItem(order);
  }
}
