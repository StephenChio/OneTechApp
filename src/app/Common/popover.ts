import { Injectable } from '@angular/core';
import {  PopoverController } from '@ionic/angular';

@Injectable()
export class Popover {
  constructor(private popoverController: PopoverController) {

  }
  currentPopover = null;
  async presentPopover(PopComponentComponent:any) {
    const popover = await this.popoverController.create({
      component: PopComponentComponent,
      translucent: true
    });
    this.currentPopover = popover;
    return await popover.present();
  }
  dismiss() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }
}