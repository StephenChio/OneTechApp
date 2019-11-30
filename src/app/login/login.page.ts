import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private globalVar:globalVar, private http: HttpClient, private common: Common) { }

  ngOnInit() {
  }
  phone: string;
  login() {
    var re = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
    if (!re.test(this.phone)) {
      this.common.presentAlert('请输入正确的手机号码。');
      return false;
    }
    else {
      let path = globalVar.baseUrl+"/login"

      const body = new HttpParams().set("phone", this.phone)

      let httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
      this.http.post(path, body, httpOptions)
        .subscribe(data => {
          if (data["respCode"] == "00") {
            var storage = window.localStorage;
            var data = data["data"];
            // const user_token = {wechatId:data["wechatId"],time:new Date}
            storage.setItem("user_token", data["wechatId"]);
            storage.setItem("userName", data["userName"]);
            storage.setItem("wechatId", data["wechatId"]);
            storage.setItem("imgPath", data["imgPath"]);
            storage.setItem("backgroundImg", data["backgroundImg"]);
            // console.log(data);
            window.location.href = "/"
          }
          else {
            this.common.presentAlert("登陆异常");
            console.log(data["respMsg"]);
          }
        },
          error => {
            this.common.presentAlert("系统繁忙,请重试");
          }
        );
    }
  }
}
