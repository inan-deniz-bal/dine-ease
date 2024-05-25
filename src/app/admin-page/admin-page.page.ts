import { Component, OnInit } from '@angular/core';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { MakeOrder } from 'src/types/makeOrderType';
import { AdminSelectedOrderService } from 'src/services/admin-selected-order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  tempRestID = '6651dc4c31d5101b265f785b';
  tableName: String = '';

  activeOrders: MakeOrder[] = [];

  constructor(private serverH: ServerHandlerService,
    private selectedOrder: AdminSelectedOrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serverH.getRestaurantOrders(this.tempRestID).subscribe({
      next: (response) => {
        console.log(response.data);
        this.activeOrders = response.data.orders;
        this.tableName = response.data.table;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    return date.toLocaleString('tr-TR', options);
  }

  openDetails(order: MakeOrder) {
    console.log(order);
    this.selectedOrder.setSelectedOrder({order: order, tableName: this.tableName});
    this.router.navigate(['/admin-order']);
  }
}
