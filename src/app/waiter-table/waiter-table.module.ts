import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterTablePageRoutingModule } from './waiter-table-routing.module';

import { WaiterTablePage } from './waiter-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterTablePageRoutingModule
  ],
  declarations: [WaiterTablePage]
})
export class WaiterTablePageModule {}
