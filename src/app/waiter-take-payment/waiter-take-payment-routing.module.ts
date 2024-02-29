import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiterTakePaymentPage } from './waiter-take-payment.page';

const routes: Routes = [
  {
    path: '',
    component: WaiterTakePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterTakePaymentPageRoutingModule {}
