import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';


@Component({
  selector: 'app-write-verifi-code',
  templateUrl: './write-verifi-code.page.html',
  styleUrls: ['./write-verifi-code.page.scss'],
})
export class WriteVerifiCodePage implements OnInit {

  constructor(private alertController: AlertController, private common: Common, private router: Router, private globalVar: globalVar, private http: HttpClient, private actionSheetController: ActionSheetController, private activatedRoute: ActivatedRoute) { }
  phone: any;
  verifiCode: any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.phone = data.phone;
    })
  }
  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: '确认',
      message: msg,
      buttons: [{
        text: 'OK',
        handler: (blah) => {
          this.router.navigate(['/phone-settings'], {
            queryParams: {
              phone: this.phone
            }
          })
        }
      }]
    });
    await alert.present();
  }
  changePhoneNum() {
    let path = globalVar.baseUrl + "/userInfo/changePhoneNum"
    const body = new HttpParams()
      .set("phone", this.phone)
      .set("verifiCode", this.verifiCode)
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          localStorage.setItem("phone", this.phone)
        }
        this.common.presentAlert(data["respMsg"]);
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
        }
      );
  }
  async showOptions() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: "重新获取验证码",
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          this.getVerifiCode();
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
  getVerifiCode() {
    let path = globalVar.baseUrl + "/getVerifiCode"
    const body = new HttpParams()
      .set("phone", this.phone)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        this.common.presentAlert(data["respMsg"]);
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
        }
      );
  }
}
