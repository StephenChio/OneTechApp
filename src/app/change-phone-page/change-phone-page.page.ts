import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-change-phone-page',
  templateUrl: './change-phone-page.page.html',
  styleUrls: ['./change-phone-page.page.scss'],
})
export class ChangePhonePagePage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private common: Common, private globalVar: globalVar, private activatedRoute: ActivatedRoute) { }
  phone: any;
  newPhone: any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.phone = data.phone;
    })
  }
  /**
   * 修改手机
   * @param phone 
   */
  checkPhoneUsed(phone: any): boolean {
    let path = globalVar.baseUrl + "/checkPhoneUsed"
    const body = new HttpParams()
      .set("phone", phone)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          return true;
        }
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
          return false;
        }
      );
    return false;
  }
  /**
   * 下一步
   * 判断手机合法性
   * 判断手机是否重复绑定
   * 判断手机重复使用
   */
  nextStep() {
    var re = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
    if (!re.test(this.newPhone)) {
      this.common.presentAlert('请输入正确的手机号码。');
      return false;
    }
    if (this.newPhone == this.phone) {
      this.common.presentAlert("请勿重复绑定手机");
      return false;
    }
    if (this.checkPhoneUsed(this.newPhone) == false) {
      this.common.presentAlert("该手机号已被使用,请更换手机号码重试");
      return;
    }
    this.sendVerifiCode()
  }
  /**
   * 发送验证码
   */
  sendVerifiCode() {
    let path = globalVar.baseUrl + "/getVerifiCode"
    const body = new HttpParams()
      .set("phone", this.newPhone)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.router.navigate(['/write-verifi-code'], {
            queryParams: {
              phone: this.newPhone
            }
          })
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
}
