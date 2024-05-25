import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrderPage } from './admin-order.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrderPageRoutingModule {}
