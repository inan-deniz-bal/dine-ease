import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class TemporaryOrderService {
  private currentOrder: Order[] = [];
  currentOrderSubject = new Subject<Order[]>();

  updateOrder(currentO: Order[]) {
    this.currentOrder = currentO;
    this.currentOrderSubject.next(this.currentOrder);
    console.log("updated order, ", this.currentOrder)
  }

  getOrder(): Order[] {

    return this.currentOrder;

  }

  constructor() {}
}
