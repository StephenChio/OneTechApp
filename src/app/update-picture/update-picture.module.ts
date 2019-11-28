import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx'
import { IonicModule } from '@ionic/angular';
import { UpdatePicturePage } from './update-picture.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePicturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UpdatePicturePage],
  providers: [Camera]
})
export class UpdatePicturePageModule { }
