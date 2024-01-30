import { Component, OnInit } from '@angular/core';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { RestList } from 'src/classes/rest-list';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.page.html',
  styleUrls: ['./waiter-home.page.scss'],
})
export class WaiterHomePage implements OnInit {
  constructor(private serverHandler: ServerHandlerService,
    private waiterTable:WaiterTableHandlerService,
    private route : Router) {}

  workingRestourant: RestList = new RestList('', 0, 0, [], []);
  ngOnInit() {
    this.workingRestourant = this.serverHandler.getWorkersRestaurant();
  }

  onClickTable(clickedTable: string) {
    console.log(clickedTable);
    this.waiterTable.setTable(clickedTable)
    this.route.navigate(['/waiter-table'])
  }
}
