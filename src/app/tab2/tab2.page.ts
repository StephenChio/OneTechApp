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
  friendLists: any;
  websocket = null;
  msgNum = null;
  baseUrl: string;
  searchText: any;
  list = [];
  searchFriendList = [];
  constructor(private router: Router, private globalVar: globalVar, private http: HttpClient, private common: Common, private ws: WebSocketService) { }
  ngOnInit() {
    var _this = this;
    this.baseUrl = globalVar.baseUrl;
    // this.getFriendList()
    const url = "/websocket/socketServer?WS_NAME=tab2" + localStorage.getItem("wechatId")
    if (this.websocket == null) {
      this.websocket = this.ws.createObservableSocket(url)
      this.websocket.onmessage = function (event: any) {
        if (_this.msgNum == null) {
          _this.msgNum = 0;
        }
        _this.msgNum = _this.msgNum + 1
        console.log(_this.msgNum)
      }
    }
  }
  doRefresh(event) {
    this.getFriendList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter() {
    this.getFriendList()
  }
  getFriendList() {
    let path = globalVar.baseUrl + "/addressList/getFriendList"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == "00") {
          var data = data["data"];
          this.friendLists = data;
          // console.log(data)
          this.list = [];
          for (var i = 0; i < 26; i++) {
            if (data[String.fromCharCode(65 + i)] != null) {//小写字母97开始
              // console.log(String.fromCharCode(65 + i))
              this.list.push(String.fromCharCode(65 + i))
            }
          }
          if (data["#"] != null) {
            this.list.push("#");
          }
          // console.log(this.list);
        }
        else {
          console.log(data["respMsg"]);
        }
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  newFriend() {
    this.msgNum = null;
    this.router.navigate(['/new-friend']);
  }
  hide() {
    var title = document.getElementById("tab2Title");
    var tab2Info = document.getElementById("tab2Info");
    var friendList = document.getElementById("friendList");
    var searchFriendList = document.getElementById("searchFriendList");
    title.style.display = "none"
    friendList.style.display = "none"
    tab2Info.style.display = "none"
    searchFriendList.style.removeProperty("display")
    console.log("hide")
  }
  show() {
    var title = document.getElementById("tab2Title");
    var tab2Info = document.getElementById("tab2Info");
    var friendList = document.getElementById("friendList");
    var searchFriendList = document.getElementById("searchFriendList");
    friendList.style.removeProperty("display")
    title.style.removeProperty("display")
    tab2Info.style.removeProperty("display")
    searchFriendList.style.display = "none"
    this.searchFriendList = [];
    console.log("show")
  }
  deleteFriend(wechatId: any) {
    let path = globalVar.baseUrl + "/addressList/deleteFriend"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", wechatId)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.removeChat(wechatId);
        this.getFriendList();
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  removeChat(wechatId: any) {
    var chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "chats"));
    for (var p in chatsGroup) {
      if (chatsGroup[p].wechatId == wechatId) {
        chatsGroup.splice(p, 1);
        // delete this.chatsGroup[p];
        localStorage.setItem(localStorage.getItem("wechatId") + "chats", JSON.stringify(chatsGroup))
        localStorage.removeItem(localStorage.getItem("wechatId") + wechatId);
      }
    }
  }
  searchFriend() {
    if(this.searchText==""){
      return;
    }
    this.searchFriendList = [];
    console.log(this.searchText);
    for (var j in this.list) {
      for (var p in this.friendLists[this.list[j]]) {
        if (this.friendLists[this.list[j]][p].userName.match(this.searchText) || this.friendLists[this.list[j]][p].phone.match(this.searchText) || this.friendLists[this.list[j]][p].wechatId.match(this.searchText)) {
          this.searchFriendList.push(this.friendLists[this.list[j]][p])
        }
      }
    }
    console.log(this.searchFriendList)
  }
}
