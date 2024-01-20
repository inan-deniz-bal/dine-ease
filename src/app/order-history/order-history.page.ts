import { Component, OnInit } from '@angular/core';
import { PastOrders } from 'src/interfaces/past-orders';
import { ServerServiceService } from 'src/services/server-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  constructor(private server: ServerServiceService) {}

  pastOrders: PastOrders[] = [];

  ngOnInit() {
    this.pastOrders = this.server.getPastOrders();
  }

  onClickComponent(a :any)
  {
    console.log(a)
  }
}
