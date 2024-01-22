import { Component, OnInit } from '@angular/core';
import { PastOrders } from 'src/interfaces/past-orders';
import { ClickedPastOrderService } from 'src/services/clicked-past-order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  selectedOrder: PastOrders = {
    restaurantName: '',
    totalPrice: 0,
    orderedMeals: [],
    date: '',
  };

  constructor(private pastOrderService:ClickedPastOrderService) {}

  ngOnInit() {
    this.selectedOrder=this.pastOrderService.getPastOrder();
  }
}
