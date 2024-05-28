import { Component, OnInit } from '@angular/core';
import { CustomerTypeService } from 'src/services/customer-type.service';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { MakeOrder } from 'src/types/makeOrderType';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { UpdateCurrentOrderService } from 'src/services/update-current-order.service';
@Component({
  selector: 'app-home-after-order',
  templateUrl: './home-after-order.page.html',
  styleUrls: ['./home-after-order.page.scss'],
})
export class HomeAfterOrderPage implements OnInit {
  constructor(
    private customerType: CustomerTypeService,
    private serverH: ServerHandlerService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private updateCurrent: UpdateCurrentOrderService
  ) {}

  orderID: string = '1';
  tableID = '';
  isOrderReady: boolean = false;

  currentOrder: MakeOrder = {
    tableId: '1',
    restaurantName: '1',
    date: new Date(),
    totalPrice: 0,
    orderedMeals: [
      {
        mealName: '1',
        mealPrice: 0,
        mealQuantity: 0,
      },
    ],
    orderStatus: '1',
  };

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Yükleniyor...',
    });
    await loading.present();

    this.customerType.setCustomerA();
    const storedOrderID = localStorage.getItem('orderID');
    const storedTableID = localStorage.getItem('tableID');

    if (storedOrderID && storedTableID) {
      this.orderID = storedOrderID;
      this.tableID = JSON.parse(storedTableID);
      console.log('order ', this.orderID, ' table ', this.tableID);
      this.serverH.checkOrder(this.orderID).subscribe({
        next: async (response) => {
          await loading.dismiss();
          if (response.data.orderStatus === 'cancel' || response.data.orderStatus === 'closed') {
            localStorage.removeItem('orderID');
            localStorage.removeItem('tableID');
            this.customerType.setCustomerB();
            this.navCtrl.navigateRoot(['./home']);
          }
          console.log(response);
          this.currentOrder = response.data;
          this.isOrderReady = this.currentOrder.orderStatus === 'ready';
        },
        error: async (err) => {
          await loading.dismiss();
          console.log(err);
        },
      });
    } else {
      await loading.dismiss();
    }
  }

  async closeOrder() {
    const loading = await this.loadingCtrl.create({
      message: 'Yükleniyor...',
    });
    await loading.present();

    this.serverH.closeOrder(this.orderID, this.tableID).subscribe({
      next: async (response) => {
        await loading.dismiss();
        console.log(response);
        this.customerType.setCustomerB();
        localStorage.removeItem('orderID');
        localStorage.removeItem('tableID');
        this.navCtrl.navigateRoot(['./home']);
      },
      error: async (err) => {
        await loading.dismiss();
        console.log(err);
      },
    });
  }

  onCancelOrderAlert() {
    this.alertCtrl
      .create({
        header: 'Uyarı',
        message: 'Siparişi iptal etmek istediğinize emin misiniz?',
        buttons: [
          {
            text: 'İptal',
            role: 'cancel',
          },
          {
            text: 'Evet',
            handler: () => {
              this.closeOrder();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  doRefresh(event: any) {
    this.serverH.checkOrder(this.orderID).subscribe({
      next: (response) => {
        if (response.data.orderStatus === 'cancel' || response.data.orderStatus === 'closed') {
          localStorage.removeItem('orderID');
          localStorage.removeItem('tableID');
          this.customerType.setCustomerB();
          this.navCtrl.navigateRoot(['./home']);
        }
        console.log(response);
        this.currentOrder = response.data;
        this.isOrderReady = this.currentOrder.orderStatus === 'ready';
        event.target.complete();
      },
      error: (err) => {
        console.log(err);
        event.target.complete();
      },
    });
  }


  onEditOrders(){
    this.navCtrl.navigateRoot(['./edit-order']);
    this.updateCurrent.setCurrentOrder(this.currentOrder);

  }

}
