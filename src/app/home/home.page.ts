import { Component, OnInit } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { SelectedRestService } from 'src/services/selected-rest.service';
import { SelectedRestaurant } from 'src/interfaces/selected-restaurant';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  restourants: RestList[] = [];
  constructor(

    private serverH: ServerHandlerService,
    private selectedRest: SelectedRestService,
    private route:Router,
    private loginSer:LoginService,
    private navCtrl:NavController

  ) {}

  isLoggedIn:boolean=false;
  ngOnInit() {
    if(this.loginSer.checkLogin())
    {
      console.log("hello")

      this.restourants = this.serverH.getRestList();
      console.log("Restaurants ",this.restourants)
    }
    else{
      this.navCtrl.navigateRoot('/login')
    }

  }
  showRestaurant(selectedRestaurant: RestList) {

    this.selectedRest.selectRestaurant(selectedRestaurant);
    this.route.navigate(['./restaurant'])
  }
}
