import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePageRoutingModule } from './table-routing.module';

import { TablePage } from './table.page';

import { OrderQrComponent } from '../components/order-qr/order-qr.component';

import { MenuQrComponent } from '../components/menu-qr/menu-qr.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TablePageRoutingModule],
  declarations: [TablePage, OrderQrComponent, MenuQrComponent],
})
export class TablePageModule {}
