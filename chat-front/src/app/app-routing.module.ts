import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@app/views/layouts/default/default.component';
import { AuthLayoutComponent } from '@app/views/layouts/auth/auth.component';
import { AuthGuard } from '@app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {
        path: 'login',
        loadChildren: () => import('./views/pages/login/login.module').then((m) => m.LoginPageModule),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
