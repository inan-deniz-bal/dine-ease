import { Component, OnInit } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { ServerHandlerService } from 'src/services/server-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  restourants: RestList[]=[]
  constructor(
    private serverH: ServerHandlerService
  ) { }

  ngOnInit() {
    this.restourants=this.serverH.getRestList();

  }

}
