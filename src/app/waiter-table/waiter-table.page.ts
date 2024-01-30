import { Component, OnInit } from '@angular/core';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';

@Component({
  selector: 'app-waiter-table',
  templateUrl: './waiter-table.page.html',
  styleUrls: ['./waiter-table.page.scss'],
})
export class WaiterTablePage implements OnInit {

  constructor(private waiterTable:WaiterTableHandlerService) { }
  table=""
  ngOnInit() {
    this.table=this.waiterTable.getTable()
  }

}
