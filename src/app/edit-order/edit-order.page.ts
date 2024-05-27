import { Component, OnInit } from '@angular/core';
import { MakeOrder } from 'src/types/makeOrderType';
import { UpdateCurrentOrderService } from 'src/services/update-current-order.service';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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

  constructor(
    private serverH: ServerHandlerService,
    private navCtrl: NavController,
    private router: Router,
    private updateOrder: UpdateCurrentOrderService
  ) {}



  ngOnInit() {
    this.currentOrder = this.updateOrder.getCurrentOrder();
    console.log(this.currentOrder)

  }
}
