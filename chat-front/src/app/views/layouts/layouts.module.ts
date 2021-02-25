import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default/default.component';
import { AuthLayoutComponent } from './auth/auth.component';

@NgModule({
  declarations: [DefaultLayoutComponent, AuthLayoutComponent],
  exports: [DefaultLayoutComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [],
})


export class LayoutsModule {
}
