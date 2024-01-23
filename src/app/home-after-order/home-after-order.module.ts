import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAfterOrderPageRoutingModule } from './home-after-order-routing.module';

import { HomeAfterOrderPage } from './home-after-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAfterOrderPageRoutingModule
  ],
  declarations: [HomeAfterOrderPage]
})
export class HomeAfterOrderPageModule {}
