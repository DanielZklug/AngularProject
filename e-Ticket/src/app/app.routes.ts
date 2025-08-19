import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path : '',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'settings',
        loadComponent: () => import('./home/settings/settings.page').then( m => m.SettingsPage)
      },
      {
        path: 'coupon',
        loadComponent: () => import('./home/coupon/coupon.page').then( m => m.CouponPage)
      },
      {
        path: 'history',
        loadComponent: () => import('./home/history/history.page').then( m => m.HistoryPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./home/profile/profile.page').then( m => m.ProfilePage)
      },
      {
        path: 'scan',
        loadComponent: () => import('./home/scan/scan.page').then( m => m.ScanPage)
      },
      {
        path: 'mycoupons',
        loadComponent: () => import('./home/mycoupons/mycoupons.page').then( m => m.MycouponsPage)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
