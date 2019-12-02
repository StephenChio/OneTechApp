import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Common } from '../Common/common';
import { WebSocketService } from '../websocket/websocket';
import { globalVar } from 'src/globalVar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  friendLists = [];
  webSocket = null;
  msgNum: any;
  baseUrl:string;
  constructor(private router:Router,private globalVar:globalVar,private http: HttpClient, private common: Common, private ws: WebSocketService) { }
  ngOnInit() {
    var _this = this;
    this.baseUrl = globalVar.baseUrl;
    this.getFriendList()
    const url = "/websocket/socketServer?WS_NAME=tab2" + localStorage.getItem("wechatId")
    this.webSocket = this.ws.createObservableSocket(url)
    this.webSocket.onmessage = function (event: any) {
      if(_this.msgNum == null){
        _this.msgNum = 0;
      }
      _this.msgNum = _this.msgNum+1
      console.log(_this.msgNum)
    }
  }
  ionViewWillEnter() {
    this.getFriendList()
  }
  getFriendList() {
    let path = globalVar.baseUrl+"/addressList/getFriendList"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == "00") {
          this.friendLists = data["data"];
        }
        else {
          console.log(data["respMsg"]);
        }
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  newFriend(){
    this.msgNum = null;
    this.router.navigate(['/new-friend']);
  }
  hide() {
    var title = document.getElementById("tab2Title");
    var tab2Info = document.getElementById("tab2Info");
    var friendList = document.getElementById("friendList");
    title.style.display = "none"
    friendList.style.display = "none"
    tab2Info.style.display = "none"
    console.log("hide")
  }
  show() {
    var title = document.getElementById("tab2Title");
    var tab2Info = document.getElementById("tab2Info");
    var friendList = document.getElementById("friendList");
    friendList.style.removeProperty("display")
    title.style.removeProperty("display")
    tab2Info.style.removeProperty("display")
    console.log("show")
  }
}
