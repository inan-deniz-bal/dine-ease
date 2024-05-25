import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { PastOrders } from 'src/interfaces/past-orders';
@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.component.html',
  styleUrls: ['./past-order.component.scss'],
})
export class PastOrderComponent implements OnInit {
  @Input() restourantName: String = 'Kardeşler Pide';
  @Input() orderDate: String = '2525';
  @Input() totalFee: Number = 0;
  @Input() pastOrder: PastOrders = {
    restaurantName:"",
    totalPrice: 0,
    orderedMeals: [],
    date: new Date(),
  };

  constructor() {}

  ngOnInit() {}
}
