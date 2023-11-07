import { Component, OnInit } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  restourants: RestList[]=[]
  constructor(
    private navCtrl: NavController,
    private serverH: ServerHandlerService
  ) { }

  ngOnInit() {
    this.restourants=this.serverH.getRestList();

  }
showRestaurant(restaurantName:string){

}

}
