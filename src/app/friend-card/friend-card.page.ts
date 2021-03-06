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
  public wechatId: string;
  public userName: string;
  public imgPath: string;
  public type = "添加好友"
  public baseUrl: string;
  public remarkName: string;
  public Img4: any;
  public name: any;
  public flag = true;
  constructor(private globalVar: globalVar, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private common: Common) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.wechatId = data.wechatId;  //上个页面传过来的值
      if (localStorage.getItem("wechatId") == this.wechatId) {
        this.flag = false;
      }
      this.imgPath = data.imgPath;
      // console.log(data.remarkName)
      if (typeof (data.remarkName) != "undefined") {
        this.name = data.remarkName
        if (data.remarkName != data.userName) {
          this.userName = data.userName;
        }
        else {
          this.userName = null
        }
      } else {
        this.name = data.userName;
        this.userName = null
      }
      this.baseUrl = globalVar.baseUrl;
      if (data.type == "acceptConfirm") {
        this.type = "确认添加";
      }
      if (data.type == "sendMsg") {
        this.type = "发消息";
      }
      localStorage.setItem("fWechatId", this.wechatId)
      localStorage.setItem("fUserName", this.name)
    })
    this.get4MomentsImgByWechatId();
  }
  /**
   * 得到用户最近4张朋友圈预览图片
   */
  get4MomentsImgByWechatId() {
    let path = globalVar.baseUrl + "/resource/get4MomentsImgByWechatId"
    const body = new HttpParams()
      .set("wechatId", this.wechatId)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.Img4 = data["data"]
        }
        else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  /**
   * 页面调整
   */
  friendVerification() {
    if (this.type == "确认添加") {
      this.addConfirm()
    }
    else if (this.type == "发消息") {
      this.router.navigate(['/chat-page'],
        {
          queryParams: { imgPath: this.imgPath, name: this.name }
        });
    }
    else {
      // this.activatedRoute.navigate(['/friend-verification'])
      this.router.navigate(['/friend-verification'])
    }
  }
  /**
   * 确认添加好友
   */
  addConfirm() {
    let path = globalVar.baseUrl + "/addressList/addConfirm"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
      .set("fWechatId", this.wechatId)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.common.presentAlert(data["respMsg"])
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
}
