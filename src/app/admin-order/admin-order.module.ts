import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOrderPageRoutingModule } from './admin-order-routing.module';

import { AdminOrderPage } from './admin-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminOrderPageRoutingModule
  ],
  declarations: [AdminOrderPage]
})
export class AdminOrderPageModule {}
