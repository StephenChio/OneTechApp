import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { globalVar } from 'src/globalVar';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private globalVar:globalVar,private actionSheetController:ActionSheetController) { }
  version:any
  ngOnInit() {
    this.version = globalVar.version
  }
  /**
   * 退出账号
   */
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
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
