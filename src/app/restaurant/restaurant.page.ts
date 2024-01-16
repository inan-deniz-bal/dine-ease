import { Component, OnInit } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { SelectedRestService } from 'src/services/selected-rest.service';
import { NavController } from '@ionic/angular';
import { Order } from 'src/interfaces/order';
import { CurrentMenuService } from 'src/services/current-menu.service';
import { ServerServiceService } from 'src/services/server-service.service';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  selectedRestaurant: RestList = new RestList('', 0, 0, [], []);
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
  selectedTable: string = '';


  ngOnInit() {
    this.selectedRestaurant = this.selectedRest.getSelectedRestaurant();
    if (this.selectedRestaurant.getName() == '') {
      this.navCtrl.navigateRoot(['./home']);
    }
    this.curMen.setMenu(this.selectedRestaurant.getMenuList())
  }
  showOrder(table: string) {
    console.log(table);
    this.selectedTable = table;
    this.showOrderComponent = !this.showOrderComponent;
  }

  orderItem(order: Order) {
    this.serverSer.orderItem(order);
  }
}
