import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOrderPage } from './edit-order.page';

const routes: Routes = [
  {
    path: '',
    component: EditOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOrderPageRoutingModule {}
