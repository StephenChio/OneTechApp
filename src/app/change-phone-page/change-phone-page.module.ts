import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangePhonePagePage } from './change-phone-page.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePhonePagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangePhonePagePage]
})
export class ChangePhonePagePageModule {}
