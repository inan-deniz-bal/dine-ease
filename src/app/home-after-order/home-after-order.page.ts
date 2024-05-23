import { Component, OnInit } from '@angular/core';
import { CustomerTypeService } from 'src/services/customer-type.service';
@Component({
  selector: 'app-home-after-order',
  templateUrl: './home-after-order.page.html',
  styleUrls: ['./home-after-order.page.scss'],
})
export class HomeAfterOrderPage implements OnInit {
  constructor(private customerType: CustomerTypeService) {}

  ngOnInit() {
    this.customerType.setCustomerA();
  }
}
