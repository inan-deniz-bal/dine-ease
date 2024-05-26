import { Component, OnInit } from '@angular/core';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { RestList } from 'src/classes/rest-list';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';
import { Router } from '@angular/router';
import { Table } from 'src/types/tableType';
@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.page.html',
  styleUrls: ['./waiter-home.page.scss'],
})
export class WaiterHomePage implements OnInit {
  constructor(
    private serverHandler: ServerHandlerService,
    private waiterTable: WaiterTableHandlerService,
    private serverH: ServerHandlerService,
    private route: Router
  ) {}

  tempRestID = '6651dc4c31d5101b265f785b';

  restaurantTables: Table[] = [];
  ngOnInit() {
    //this.workingRestourant = this.serverHandler.getWorkersRestaurant();
    this.serverH.getTablesForRestaurant(this.tempRestID).subscribe({
      next: (response) => {
        console.log(response.data);
        this.restaurantTables = response.data;
      },
      error: (err) => {},
    });
  }

  onClickTable(clickedTable: Table) {
    console.log(clickedTable);
    this.waiterTable.setTable(clickedTable);
    this.route.navigate(['/waiter-table']);
  }
}
