import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiterTablePage } from './waiter-table.page';

const routes: Routes = [
  {
    path: '',
    component: WaiterTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterTablePageRoutingModule {}
