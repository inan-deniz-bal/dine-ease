import { Component, OnInit } from '@angular/core';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiter-table',
  templateUrl: './waiter-table.page.html',
  styleUrls: ['./waiter-table.page.scss'],
})
export class WaiterTablePage implements OnInit {

  constructor(private waiterTable:WaiterTableHandlerService,
    private route: Router) { }
  table=""
  currentFee=0
  ngOnInit() {
    this.table=this.waiterTable.getTable()
  }

  takePayment(){
    this.route.navigate(['./waiter-take-payment'])
  }

  closeTable(){
    //eğer kalan para sıfırsa borç kapanır

  }

}
