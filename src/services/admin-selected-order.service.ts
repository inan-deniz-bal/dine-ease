import { Injectable } from '@angular/core';
import { MakeOrder } from 'src/types/makeOrderType';

@Injectable({
  providedIn: 'root',
})
export class AdminSelectedOrderService {


  selectedOrder:admin_order={
    order: {
      tableId: '',
      restaurantName: '',
      date: new Date(),
      totalPrice: 0,
      orderedMeals: [],
      orderStatus: '',
    },
    tableName:''
  }

  setSelectedOrder(order: admin_order) {
    this.selectedOrder = order;
  }
  getSelectedOrder():admin_order {
    return this.selectedOrder;
  }
  constructor() {}
}

type admin_order={
  order: MakeOrder;
  tableName:String
}
