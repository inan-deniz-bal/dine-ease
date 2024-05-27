import { Injectable } from '@angular/core';
import { MakeOrder } from 'src/types/makeOrderType';
@Injectable({
  providedIn: 'root'
})
export class UpdateCurrentOrderService {

  private defaultCurrentOrder:MakeOrder={
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


  setCurrentOrder(order:MakeOrder){
    this.defaultCurrentOrder=order;
  }

  getCurrentOrder():MakeOrder{
    return this.defaultCurrentOrder;
  }
  constructor() { }
}
