import { Component, OnInit } from '@angular/core';
import { AdminSelectedOrderService } from 'src/services/admin-selected-order.service';
import { MakeOrder } from 'src/types/makeOrderType';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.page.html',
  styleUrls: ['./admin-order.page.scss'],
})
export class AdminOrderPage implements OnInit {
  constructor(private selectedOrder: AdminSelectedOrderService) {}

  tableName: String = '';
  orderDetails: MakeOrder = {
    tableId: '',
    restaurantName: '',
    date: new Date(),
    totalPrice: 0,
    orderedMeals: [],
    orderStatus: '',
  };


  ngOnInit() {
    console.log("mergaba")
    console.log(this.selectedOrder.getSelectedOrder());
    this.tableName = this.selectedOrder.getSelectedOrder().tableName;
    this.orderDetails = this.selectedOrder.getSelectedOrder().order;
  }
}
