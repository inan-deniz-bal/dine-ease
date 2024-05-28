import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOrderPageRoutingModule } from './edit-order-routing.module';

import { EditOrderPage } from './edit-order.page';

import { OrderTableComponent } from '../components/order-table/order-table.component';

import { MenuTableComponent } from '../components/menu-table/menu-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOrderPageRoutingModule
  ],
  declarations: [EditOrderPage,OrderTableComponent,MenuTableComponent]
})
export class EditOrderPageModule {}
