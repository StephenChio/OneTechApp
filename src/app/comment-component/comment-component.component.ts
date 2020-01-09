import { Component, OnInit } from '@angular/core';
import { Popover } from '../Common/popover';
import { Common } from '../Common/common';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-comment-component',
  templateUrl: './comment-component.component.html',
  styleUrls: ['./comment-component.component.scss'],
})
export class CommentComponentComponent implements OnInit {

  constructor(private globalVar: globalVar, private http: HttpClient, private common: Common, private popover: Popover) { }

  ngOnInit() { }
  comment() {
    this.popover.dismiss();
  }
  clickLike() {
    let path = globalVar.baseUrl + "/comments/clickLike"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("momentId", localStorage.getItem("momentId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.common.presentAlert(data["respMsg"])
        }
        else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
    this.popover.dismiss();
  }
}
