import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.page.html',
  styleUrls: ['./friend-card.page.scss'],
})
export class FriendCardPage implements OnInit {
  public fWechatId: string;
  public fUserName: string;
  public imgPath: string;
  public type = "添加好友"
  public baseUrl:string;
  constructor(private globalVar:globalVar, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private common: Common) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.fWechatId = data.fWechatId;  //上个页面传过来的值
      this.fUserName = data.fUserName;
      this.imgPath = data.imgPath;
      this.baseUrl = globalVar.baseUrl;
      if (data.type == "acceptConfirm") {
        this.type = "确认添加";
      }
      if (data.type == "sendMsg") {
        this.type = "发消息";
      }
      localStorage.setItem("fWechatId", this.fWechatId)
      localStorage.setItem("fUserName", this.fUserName)
    })
  }
  friendVerification() {
    if (this.type == "确认添加") {
      this.addConfirm()
    }
    else if (this.type == "发消息") {
      this.router.navigate(['/chat-page'],
        {
          queryParams: { imgPath: this.imgPath }
        });
    }
    else {
      // this.activatedRoute.navigate(['/friend-verification'])
      this.router.navigate(['/friend-verification'])
    }
  }
  addConfirm() {
    let path = globalVar.baseUrl+"/addressList/addConfirm"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", this.fWechatId)
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
