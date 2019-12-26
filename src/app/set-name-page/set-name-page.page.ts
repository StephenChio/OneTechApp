import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-set-name-page',
  templateUrl: './set-name-page.page.html',
  styleUrls: ['./set-name-page.page.scss'],
})
export class SetNamePagePage implements OnInit {

  constructor(private globalVar: globalVar, private http: HttpClient, private common: Common) { }
  userName: any;
  ngOnInit() {
    this.userName = window.localStorage.getItem("userName");
  }
  /**
   * 修改昵称
   */
  updateName() {
    if (this.userName == null || this.userName == "") {
      this.common.presentAlert("名字请勿为空")
      return
    }
    else {
      if (this.userName.length >= 15) {
        this.common.presentAlert("请勿使用超过15个字")
        return
      }
    }
    let path = globalVar.baseUrl + "/userInfo/updateName"
    const body = new HttpParams()
      .set("userName", this.userName)
      .set("wechatId", localStorage.getItem("wechatId"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"])
        localStorage.setItem("userName", data["data"]["userName"]);
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
}
