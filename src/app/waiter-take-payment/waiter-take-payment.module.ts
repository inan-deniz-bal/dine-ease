import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterTakePaymentPageRoutingModule } from './waiter-take-payment-routing.module';

import { WaiterTakePaymentPage } from './waiter-take-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterTakePaymentPageRoutingModule
  ],
  declarations: [WaiterTakePaymentPage]
})
export class WaiterTakePaymentPageModule {}
