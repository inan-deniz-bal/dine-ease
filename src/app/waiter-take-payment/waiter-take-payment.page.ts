import { Component, OnInit } from '@angular/core';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';
import { Order } from 'src/interfaces/order';
import { WaiterPaymentService } from 'src/services/waiter-payment.service';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { TempOrder } from 'src/types/tempOrderType';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { slideInFromLeftAnimation } from 'src/animations/animation';
import { slideInFromRightAnimation } from 'src/animations/animation2';
import { slideOutToRightAnimation } from 'src/animations/amination3';

@Component({
  selector: 'app-waiter-take-payment',
  templateUrl: './waiter-take-payment.page.html',
  styleUrls: ['./waiter-take-payment.page.scss'],
})
export class WaiterTakePaymentPage implements OnInit {
  orderList: Order[] = [];
  mealsToPay: Order[] = [];
  disabled = false;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private serverH: ServerHandlerService,
    private waiterP: WaiterPaymentService,
    private waiterTableService: WaiterTableHandlerService
  ) {}
  tableName: String = '';
  ngOnInit() {
    this.orderList = this.waiterP.getTempOrder().orderedMeals;
    this.tableName = this.waiterTableService.getTable().tableName;
    if (this.orderList.length == 0) {
      this.disabled = true;
      this.alertCtrl
        .create({
          header: 'Hata',
          message: 'Ödeme alınacak sipariş bulunamadı.',
          buttons: [
            {
              text: 'Tamam',
              handler: () => {
                this.navCtrl.navigateRoot(['./waiter-home']);
              },
            },
          ],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
  }

  addToPay(meal: Order) {
    const contains = this.mealsToPay.some(
      (payMeal) => payMeal.mealName === meal.mealName
    );

    console.log(contains);

    if (!contains) {
      this.mealsToPay.push({
        mealName: meal.mealName,
        mealQuantity: 1,
        mealPrice: meal.mealPrice,
      });
      this.orderList.map((listMeal) => {
        if (listMeal.mealName == meal.mealName) {
          listMeal.mealQuantity -= 1;
        }
      });
      console.log('Listeye eklendi ', this.mealsToPay);
    } else {
      this.mealsToPay.map((mealsToPay) => {
        if (mealsToPay.mealName == meal.mealName) {
          this.orderList.map((mealsLeft) => {
            if (
              mealsLeft.mealQuantity != 0 &&
              mealsLeft.mealName == mealsToPay.mealName
            ) {
              mealsToPay.mealQuantity += 1;
              mealsLeft.mealQuantity -= 1;
            }
          });
        }
      });
    }
    this.orderList = this.checkForNoMeal(this.orderList);
  }

  removeFromPay(meal: Order) {
    if (meal.mealQuantity && meal.mealQuantity <= 1) {
      const newMeals = this.mealsToPay.filter(
        (listMeal) => listMeal.mealName != meal.mealName
      );
      this.mealsToPay = newMeals;
      this.addToList(meal, this.orderList);
    } else {
      this.mealsToPay.map((listMeal) => {
        if (listMeal.mealName == meal.mealName && meal.mealQuantity) {
          listMeal.mealQuantity = meal.mealQuantity - 1;
          this.addToList(meal, this.orderList);
        }
      });
    }

    console.log(this.mealsToPay);
  }

  checkForNoMeal(orderList: Order[]) {
    orderList = orderList.filter((order) => order.mealQuantity != 0);
    return orderList;
  }

  addToList(meal: Order, mealList: Order[]) {
    console.log('ödenecek yemekler: ', this.mealsToPay);
    console.log('kalan yemekler', this.orderList);
    const contains = mealList.some(
      (payMeal) => payMeal.mealName === meal.mealName
    );

    if (contains) {
      mealList = mealList.map((listMeal) => {
        if (listMeal.mealName == meal.mealName) {
          listMeal.mealQuantity += 1;
        }
        return listMeal;
      });
      return mealList;
    } else {
      mealList.push({
        mealName: meal.mealName,
        mealQuantity: 1,
        mealPrice: meal.mealPrice,
      });
      return mealList;
    }
  }

  approvePayment() {
    console.log('siparişten kalanlar ', this.orderList);
    console.log('ödenecekler ', this.mealsToPay);
    if(this.orderList.length == 0 ){
      console.log("merhaba")
      this.onNoMorePaymentAlert();
    }
    if (this.mealsToPay.length == 0 && this.orderList.length == 0) {
      this.alertCtrl
        .create({
          header: 'Hata',
          message: 'Ödenecek bir şey yok.',
          buttons: [
            {
              text: 'Tamam',
            },
          ],
        })
        .then((alertEl) => {
          alertEl.present();
        });
      return;
    } else {
      const tempOrderId = this.waiterP.getTempOrder()._id;
      if (tempOrderId) {
        this.serverH
          .updateTempOrder( this.orderList,this.mealsToPay, tempOrderId)
          .subscribe({
            next: (response) => {
              console.log(response);
              this.navCtrl.navigateRoot(['./waiter-table']);
            },
            error: (error) => {
              if (error.error.message == 'done') {
                this.onNoMorePaymentAlert();
              }
            },
          });
      }
    }
  }

  onApprovePaymentAlert() {
    this.alertCtrl
      .create({
        header: 'Ödeme Onayı',
        message: 'Ödeme işlemini onaylıyor musunuz?',
        buttons: [
          {
            text: 'Evet',
            handler: () => {
              this.approvePayment();
            },
          },
          {
            text: 'Hayır',
            role: 'cancel',
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  onNoMorePaymentAlert() {
    this.alertCtrl
      .create({
        header: 'Ödeme Alınacak Başka Sipariş Yok',
        message: 'Ödeme alınacak başka sipariş bulunamadı. Masayı kapatabilirsiniz!',
        buttons: [
          {
            text: 'Tamam',
            handler: () => {
              this.navCtrl.navigateRoot(['./waiter-table']);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
  backWards() {
    this.navCtrl.navigateRoot(['./waiter-table']);
  }
}
