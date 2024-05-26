import { Component, OnInit } from '@angular/core';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';
import { Router } from '@angular/router';
import { Table } from 'src/types/tableType';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { Order } from 'src/interfaces/order';
import { TempOrder } from 'src/types/tempOrderType';
import { WaiterPaymentService } from 'src/services/waiter-payment.service';
@Component({
  selector: 'app-waiter-table',
  templateUrl: './waiter-table.page.html',
  styleUrls: ['./waiter-table.page.scss'],
})
export class WaiterTablePage implements OnInit {
  constructor(
    private waiterTable: WaiterTableHandlerService,
    private serverH: ServerHandlerService,
    private route: Router,
    private waiterP: WaiterPaymentService
  ) {}
  currentOrder: Order[] = [];
  paidOrders: Order[] = [];

  totalLeft = 0;
  totalPaid = 0;
  table: Table = {
    tableName: '',
    _id: '',
    orders: [
      {
        date: new Date(),
        currentOrder: '',
        customerId: '',
        status: '',
      },
    ],
  };
  ordersId: string[] = [];
  currentFee = 0;
  ngOnInit() {
    this.table = this.waiterTable.getTable();
    this.table.orders.map((order) => {
      this.ordersId.push(order.currentOrder);
    });
    console.log('order idler', this.ordersId);
    this.serverH.checkTempOrder(this.ordersId).subscribe({
      next: (response) => {
        this.waiterP.setTempOrder(response.data);
        this.currentOrder = response.data.orderedMeals;
        this.totalLeft = this.currentOrder.reduce(
          (acc, cur) => acc + cur.mealPrice,
          0
        );

        this.paidOrders = response.data.paidMeals;

        this.totalPaid = this.paidOrders.reduce(
          (acc, cur) => acc + cur.mealPrice,
          0
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  takePayment() {
    this.route.navigate(['./waiter-take-payment']);
  }

  closeTable() {
    //eğer kalan para sıfırsa borç kapanır
  }
}
