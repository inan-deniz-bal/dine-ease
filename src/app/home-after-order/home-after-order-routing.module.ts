import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAfterOrderPage } from './home-after-order.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAfterOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAfterOrderPageRoutingModule {}
