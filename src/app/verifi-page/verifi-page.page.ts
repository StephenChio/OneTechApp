import { Component, OnInit } from '@angular/core';
import { globalVar } from 'src/globalVar';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Common } from '../Common/common';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'
import { interval } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-verifi-page',
  templateUrl: './verifi-page.page.html',
  styleUrls: ['./verifi-page.page.scss'],
})
export class VerifiPagePage implements OnInit {

  constructor(private actionSheetController: ActionSheetController, private router: Router, private activatedRoute: ActivatedRoute, private globalVar: globalVar, private http: HttpClient, private common: Common) { }
  phone: any;
  verifiCode: any
  isSend = false;
  paracont = "发送验证码";
  disabledClick: any;
  useVerifiCode = true;
  usePassword = false;
  password: any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      // console.log(data.phone)
      this.phone = data.phone;
    });
  }
  countDown(time: any) {
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(60));
    takeFourNumbers.subscribe(
      x => {
        this.paracont = (60 - x) + "秒后可重发";
        this.disabledClick = true;
      },
      error => { },
      () => {
        this.paracont = "重新发送验证码";
        this.disabledClick = false;
      });
  }
  getVerifiCode() {
    let path = globalVar.baseUrl + "/getVerifiCode"
    const body = new HttpParams().set("phone", this.phone)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == "00") {
          this.isSend = true;
          this.countDown(60);
        }
        else {
          this.common.presentAlert(data["respMsg"]);
        }
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
        }
      );
  }
  login() {
    if (!this.isSend && this.useVerifiCode) {
      this.common.presentAlert("请先发送验证码")
      return;
    }
    let loginType = null;
    if (this.useVerifiCode) {
      if (this.verifiCode == null || this.verifiCode.length !== 6) {
        this.common.presentAlert("请正确填写二维码")
        return;
      }
      loginType = "verifiCode"
    }
    else {
      if (this.password == null || this.password.length >= 31) {
        this.common.presentAlert("请正确填写密码")
        return;
      }
      loginType = "password"
    }
    let path = globalVar.baseUrl + "/login"
    const body = new HttpParams().set("phone", this.phone).set("verifiCode", this.verifiCode).set("password", this.password).set("loginType", loginType)

    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == "00") {
          var storage = window.localStorage;
          var data = data["data"];
          console.log(data)
          // const user_token = {wechatId:data["wechatId"],time:new Date}
          storage.setItem("user_token", data["wechatId"]);
          storage.setItem("userName", data["userName"]);
          storage.setItem("wechatId", data["wechatId"]);
          storage.setItem("imgPath", data["imgPath"]);
          storage.setItem("phone", data["phone"]);
          storage.setItem("backgroundImg", data["backgroundImg"]);
          // console.log(data);
          if (data["passWord"] == null) {
            this.router.navigate(['/set-password'],
              {
                queryParams: { type: "init" }
              }
            )
          }
          else { 
            this.router.navigate(['/']) 
          }
        }
        else {
          this.common.presentAlert(data["respMsg"]);
        }
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
        }
      );
  }
  getMoreOptions() {
    this.common.presentAlert("敬请期待")
  }
  findPassword() {
    this.common.presentAlert("敬请期待")
  }
  emergencyFreeze() {
    this.common.presentAlert("敬请期待")
  }
  async changeVerifiWay() {
    let msg = null;
    if (this.useVerifiCode) {
      msg = "用密码登陆"
    }
    else {
      msg = "用验证码登陆"
    }
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: msg,
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          console.log(this.useVerifiCode + "|" + this.usePassword)
          if (this.useVerifiCode) {
            this.useVerifiCode = false;
            this.usePassword = true;
          }
          else {
            this.useVerifiCode = true;
            this.usePassword = false;
          }
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
