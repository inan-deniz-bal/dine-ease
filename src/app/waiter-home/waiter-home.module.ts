import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterHomePageRoutingModule } from './waiter-home-routing.module';

import { WaiterHomePage } from './waiter-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterHomePageRoutingModule
  ],
  declarations: [WaiterHomePage]
})
export class WaiterHomePageModule {}
