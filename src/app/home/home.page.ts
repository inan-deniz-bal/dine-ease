import { Component, OnInit } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { SelectedRestService } from 'src/services/selected-rest.service';
import { SelectedRestaurant } from 'src/interfaces/selected-restaurant';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Restaurant } from 'src/types/restaurantType';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  restourants: RestList[] = [];
  restaurants: Restaurant[] = [];
  constructor(
    private serverH: ServerHandlerService,
    private selectedRest: SelectedRestService,
    private route: Router,
    private loginSer: LoginService,
    private navCtrl: NavController
  ) {}

  imageList = ['./../../assets/rst.jpg', './../../assets/pastane.png', './../../assets/kebap.jpeg'];

  isLoggedIn: boolean = false;
  ngOnInit() {
    if (this.loginSer.checkLogin()) {
      if(localStorage.getItem("menu-type")=="waiter"){
        this.navCtrl.navigateRoot('/waiter-home');
      }
      console.log('hello');


      //this.restourants = this.serverH.getRestList();
      console.log('Restaurants ', this.restourants);
      this.serverH.getAllRestaurants().subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.restaurants = data.data;
          this.restaurants[0].images = this.imageList[1];
          this.restaurants[1].images = this.imageList[0];
          this.restaurants[2].images = this.imageList[2];
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }
  showRestaurant(selectedRestaurant: Restaurant) {
    this.selectedRest.selectRestaurant(selectedRestaurant);
    this.route.navigate(['./restaurant']);
  }
}
