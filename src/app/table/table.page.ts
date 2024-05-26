import { Component, OnInit } from '@angular/core';
import { Table } from 'src/types/tableType';
import { Menu } from 'src/interfaces/menu';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { RestaurantByTableService } from 'src/services/restaurant-by-table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  table: Table = {
    tableName: 'QR Masa',
    _id: '',
  };
  menu: Menu[] = [];
  constructor(
    private serverH: ServerHandlerService,
    private restByTable: RestaurantByTableService
  ) {}

  ngOnInit() {
    this.table._id = this.restByTable.getSelectedTableID();
  }
}
