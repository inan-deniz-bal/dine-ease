import { Component, OnInit } from '@angular/core';
import { PastOrders } from 'src/interfaces/past-orders';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClickedPastOrderService } from 'src/services/clicked-past-order.service';
import { ServerHandlerService } from 'src/services/server-handler.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  constructor(
    //private server: ServerServiceService,
    private route: Router,
    private clickedPastOrder: ClickedPastOrderService,
    private serverhandler: ServerHandlerService,
    private alert: AlertController
  ) {}

  pastOrders: PastOrders[] = [];

  ngOnInit() {
    console.log('deneme');
    this.serverhandler.getPastOrders().subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 'failed') {
          this.alert
            .create({
              header: 'Error',
              message: response.message,
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
          console.log(response.message);
        } else {
           response.data[0].orders.map((order: any) => {
            this.pastOrders.push(order);
            console.log("sipariş ",order)
          });
        }
        console.log(this.pastOrders);
      },
      error: (err) => {
        if (err.error.status == 401) {
          console.log('Unauthorized');
        }
      },
    });
    //this.pastOrders = this.server.getPastOrders();
  }

  onClickComponent(clickedOrder: PastOrders) {
    this.clickedPastOrder.setPastOrder(clickedOrder);
    this.route.navigate(['/order-detail']);
  }
}
