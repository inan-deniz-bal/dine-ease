import { Component, OnInit } from '@angular/core';
import { PastOrders } from 'src/interfaces/past-orders';
import { ServerServiceService } from 'src/services/server-service.service';
import { Router } from '@angular/router';
import { ClickedPastOrderService } from 'src/services/clicked-past-order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  constructor(
    private server: ServerServiceService,
    private route: Router,
    private clickedPastOrder: ClickedPastOrderService
  ) {}

  pastOrders: PastOrders[] = [];

  ngOnInit() {
    this.pastOrders = this.server.getPastOrders();
  }

  onClickComponent(clickedOrder: PastOrders) {
    this.clickedPastOrder.setPastOrder(clickedOrder);
    this.route.navigate(['/order-detail']);
  }
}
