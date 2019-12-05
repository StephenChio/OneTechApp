import { Component, OnInit } from '@angular/core';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {

  constructor(private common:Common,private globalVar:globalVar,private http:HttpClient) { }
  wechatId:any;
  oldPwd:any;
  newPwd:any;
  confirmPwd:any;
  disabledClick = true;
  ngOnInit() {
    this.wechatId = localStorage.getItem("wechatId")
  }
  updatePassword(){
    var re = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,32})$/;
    if (!re.test(this.confirmPwd)) {
      this.common.presentAlert('密码必须至少八个字符,而且同时包含字母和数字');
      return false;
    }
    if(this.confirmPwd.length>=31){
      this.common.presentAlert('密码长度过长,请重新设置');
      return false;
    }
    let path = globalVar.baseUrl + "/userInfo/updatePassword"
    const body = new HttpParams().set("wechatId",localStorage.getItem("wechatId")).set("oldPwd",this.oldPwd).set("newPwd",this.newPwd);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"]);
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
        }
      );
  }
  confirm(){
    if(this.oldPwd!==null && this.newPwd == this.confirmPwd){
      console.log(false)
      this.disabledClick = false;
    }
    else{
      console.log(true)
      this.disabledClick = true;
    }
  }
}
