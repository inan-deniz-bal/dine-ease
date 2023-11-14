import { Injectable } from '@angular/core';
import { Order } from 'src/interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class ServerServiceService {
  private userOrders: Order[] = [];
  constructor() {}

  orderItem(order: Order) {
    this.userOrders.push(order);
  }
}
