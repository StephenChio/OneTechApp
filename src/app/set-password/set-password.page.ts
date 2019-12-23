import { Component, OnInit } from '@angular/core';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private common: Common, private globalVar: globalVar, private http: HttpClient) { }
  wechatId: any;
  oldPwd: any;
  newPwd: any;
  confirmPwd: any;
  disabledClick = true;
  hasPassword :any;
  ngOnInit() {
    this.wechatId = localStorage.getItem("wechatId")
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.hasPassword = data.hasPassword;
    });
    this.hasPassword =localStorage.getItem("hasPassword")
  }
  /**
   * 修改密码
   * 判断密码合法性
   * 判断密码与旧密码是否一致
   * 判断密码长度
   */
  updatePassword() {
    var re = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,32})$/;
    if (!re.test(this.confirmPwd)) {
      this.common.presentAlert('密码必须至少八个字符,而且同时包含字母和数字');
      return false;
    }
    if (this.hasPassword == "true") {
      if (this.oldPwd == this.newPwd) {
        this.common.presentAlert('新密码请勿与旧密码相同');
        return false;
      }
    }
    if (this.confirmPwd.length >= 31) {
      this.common.presentAlert('密码长度过长,请重新设置');
      return false;
    }
    let path = globalVar.baseUrl + "/userInfo/updatePassword"
    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId")).set("oldPwd", this.oldPwd).set("newPwd", this.newPwd).set("hasPassword", this.hasPassword);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.newPwd = null;
        this.confirmPwd = null;
        this.oldPwd = null;
        this.common.presentAlert(data["respMsg"]);
        if (this.hasPassword == "true") {
          this.router.navigate(['/'])
        }
        else {
          localStorage.setItem("hasPassword","true")
          this.router.navigate(['/account-safe'])
        }
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
        }
      );
  }
  /**
   * 判断新密码与确认密码是否相同
   */
  confirm() {
    if ((this.oldPwd !== null || this.hasPassword != true) && this.newPwd == this.confirmPwd) {
      // console.log(false)
      this.disabledClick = false;
    }
    else {
      // console.log(true)
      this.disabledClick = true;
    }
  }
}
