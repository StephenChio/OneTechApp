import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WriteVerifiCodePage } from './write-verifi-code.page';

const routes: Routes = [
  {
    path: '',
    component: WriteVerifiCodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WriteVerifiCodePage]
})
export class WriteVerifiCodePageModule {}
