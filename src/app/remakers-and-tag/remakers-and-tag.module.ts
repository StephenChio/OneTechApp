import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RemakersAndTagPage } from './remakers-and-tag.page';

const routes: Routes = [
  {
    path: '',
    component: RemakersAndTagPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RemakersAndTagPage]
})
export class RemakersAndTagPageModule {}
