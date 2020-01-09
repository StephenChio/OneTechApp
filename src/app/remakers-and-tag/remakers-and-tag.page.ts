import { Component, OnInit } from '@angular/core';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-remakers-and-tag',
  templateUrl: './remakers-and-tag.page.html',
  styleUrls: ['./remakers-and-tag.page.scss'],
})
export class RemakersAndTagPage implements OnInit {

  constructor(private http: HttpClient, private common: Common, private globalVar: globalVar) { }
  remarkName: any
  phone: any
  describe: any
  ngOnInit() {
    this.remarkName = localStorage.getItem("fUserName")
  }
  /**
   * 更新备注
   */
  updateRemakers() {
    if (this.remarkName == null) {
      this.remarkName == ""
    }
    else {
      if (this.remarkName >= 15) {
        this.common.presentAlert("请勿输入超过15个字")
        return;
      }
    }
    if (this.phone == null) {
      this.phone = "";
    }
    else {
      var re = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
      if (!re.test(this.phone)) {
        this.common.presentAlert('请输入正确的手机号码。');
        return;
      }
    }
    if (this.describe == null) {
      this.describe = "";
    }
    else {
      if (this.describe >= 120) {
        this.common.presentAlert("请勿输入超过120个字")
        return;
      }
    }
    let path = globalVar.baseUrl + "/remark/updateRemakers"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", localStorage.getItem("fWechatId"))
      .set("remarkName", this.remarkName)
      .set("phone", this.phone)
      .set("describe", this.describe)
      .set("token",localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        this.common.presentAlert(data["respMsg"])
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
}
