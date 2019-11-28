import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-friend-verification',
  templateUrl: './friend-verification.page.html',
  styleUrls: ['./friend-verification.page.scss'],
})
export class FriendVerificationPage implements OnInit {

  constructor(private globalVar:globalVar, private http: HttpClient, private common: Common) { }
  verificationMsg: any;
  ngOnInit() { }
  // VerificationConfirm() {
  //   console.log(this.verificationMsg);
  //   this.common.presentAlertConfirm("确认是否发送验证消息",this.sendVerification,this.verificationMsg);

  // }
  sendVerification() {
    let path = globalVar.baseUrl+"/addressList/sendVerification";
    const body = new HttpParams()
      .set("verificationMsg", this.verificationMsg)
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", localStorage.getItem("fWechatId"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"])
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
}
