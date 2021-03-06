import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { callbackify } from 'util';



@Injectable()
export class Common {
  constructor(private alertController: AlertController) {

  }
  /**
   * 
   * @param msg 通用弹出通知组件
   */
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
  /**
   * 获取32位随机码
   * @param len 
   */
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
   /**
   * 
   * @param msg 退出账号
   */
  async quit(msg: any) {
    const alert = await this.alertController.create({
      header: '确认',
      message: msg,
      buttons: [{
        text: 'OK',
        handler: (blah) => {
          localStorage.removeItem("backgroundImg");
          localStorage.removeItem("fUserName");
          localStorage.removeItem("fWechatId");
          localStorage.removeItem("hasPassword");
          localStorage.removeItem("imgPath");
          localStorage.removeItem("phone");
          localStorage.removeItem("userName");
          localStorage.removeItem("wechatId");
          localStorage.removeItem("token");
          window.location.href = "login"
        }
      }]
    });
    await alert.present();
  }
}