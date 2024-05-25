import { Injectable } from '@angular/core';
import { PastOrders } from 'src/interfaces/past-orders';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClickedPastOrderService {
  private clickedPastOrder: PastOrders = {
    restaurantName: '',
    totalPrice: 0,
    orderedMeals: [],
    date: new Date(),
  };

  constructor() {}

  setPastOrder(clickedOrder: PastOrders) {
    this.clickedPastOrder = clickedOrder;
  }

  getPastOrder() {
    return this.clickedPastOrder;
  }
}
