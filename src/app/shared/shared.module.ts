import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CartIconComponent } from './layouts/cart-icon/cart-icon.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    CartIconComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class SharedModule { }
