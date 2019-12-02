import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private actionSheetController:ActionSheetController) { }

  ngOnInit() {
  }
  async quit() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: "确认退出(不会清除任何数据)",
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          var storage = window.localStorage;
          storage.removeItem("user_token");
          window.location.href = "login"
        }
      }, {
        text: '取消',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
