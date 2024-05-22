import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard'; // AuthGuard'ı ekleyin

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  // Korunması gereken rotaları bir grup altında toplayın
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'restaurant',
        loadChildren: () =>
          import('./restaurant/restaurant.module').then(
            (m) => m.RestaurantPageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./payment/payment.module').then((m) => m.PaymentPageModule),
      },
      {
        path: 'qr',
        loadChildren: () =>
          import('./qr/qr.module').then((m) => m.QrPageModule),
      },
      {
        path: 'order-history',
        loadChildren: () =>
          import('./order-history/order-history.module').then(
            (m) => m.OrderHistoryPageModule
          ),
      },
      {
        path: 'order-detail',
        loadChildren: () =>
          import('./order-detail/order-detail.module').then(
            (m) => m.OrderDetailPageModule
          ),
      },
      {
        path: 'home-after-order',
        loadChildren: () =>
          import('./home-after-order/home-after-order.module').then(
            (m) => m.HomeAfterOrderPageModule
          ),
      },
      {
        path: 'waiter-home',
        loadChildren: () =>
          import('./waiter-home/waiter-home.module').then(
            (m) => m.WaiterHomePageModule
          ),
      },
      {
        path: 'waiter-table',
        loadChildren: () =>
          import('./waiter-table/waiter-table.module').then(
            (m) => m.WaiterTablePageModule
          ),
      },
      {
        path: 'waiter-take-payment',
        loadChildren: () =>
          import('./waiter-take-payment/waiter-take-payment.module').then(
            (m) => m.WaiterTakePaymentPageModule
          ),
      },
    ],
  },  {
    path: 'add-card',
    loadChildren: () => import('./add-card/add-card.module').then( m => m.AddCardPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
