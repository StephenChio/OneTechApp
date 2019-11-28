import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { callbackify } from 'util';



@Injectable()
export class Common {
  constructor(private alertController: AlertController) {

  }
  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: '确认',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertConfirm(msg: any, callBack: any, callbackParam: any) {
    const alert = await this.alertController.create({
      header: '请确认!',
      message: msg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            callBack(callbackParam);
          }
        }
      ]
    });
    await alert.present();
  }
  getRandomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}