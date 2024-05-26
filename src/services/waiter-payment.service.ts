import { Injectable } from '@angular/core';
import { TempOrder } from 'src/types/tempOrderType';

@Injectable({
  providedIn: 'root',
})
export class WaiterPaymentService {
  private defaulTempOrder: TempOrder = {
    currentOrderId: '',
    orderedMeals: [],
    paidMeals: [],
    _id: '',
  };

  getTempOrder(): TempOrder {
    return this.defaulTempOrder;
  }

  setTempOrder(tempOrder: TempOrder) {
    console.log("değer değişti")
    this.defaulTempOrder = tempOrder;
  }

  constructor() {}
}
