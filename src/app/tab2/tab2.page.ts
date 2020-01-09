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
  remarklist = [];
  removeMsg = "删除"
  constructor(private router: Router, private globalVar: globalVar, private http: HttpClient, private common: Common, private ws: WebSocketService) { }
  ngOnInit() {
    var _this = this;
    this.baseUrl = globalVar.baseUrl;
    // this.getFriendList()
    const url = "/websocket/socketServer?WS_NAME=tab2" + "and" + localStorage.getItem("wechatId")
    if (this.websocket == null) {
      this.websocket = this.ws.createObservableSocket(url)
      this.websocket.onmessage = function (event: any) {
        if (_this.msgNum == null) {
          _this.msgNum = 0;
        }
        _this.msgNum = _this.msgNum + 1
        // console.log(_this.msgNum)
      }
    }
  }
  /**
   * 
   * @param event 刷新
   */
  doRefresh(event) {
    this.getFriendList();
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  /**
   * 进入时操作
   */
  ionViewWillEnter() {
    this.getFriendList()
  }
  /**
   * 获取好友列表
   */
  getFriendList() {
    let path = globalVar.baseUrl + "/addressList/getFriendList"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          var data = data["data"];
          this.friendLists = data;
          // console.log(data)
          this.list = [];
          this.remarklist = [];
          for (var i = 0; i < 26; i++) {
            if (data[String.fromCharCode(65 + i)] != null) {//小写字母97开始
              // console.log(String.fromCharCode(65 + i))
              this.list.push(String.fromCharCode(65 + i))
              for (var j = 0; j < data[String.fromCharCode(65 + i)].length; j++) {
                if (data[String.fromCharCode(65 + i)][j].remarkName != null) {
                  this.remarklist.push(data[String.fromCharCode(65 + i)][j])
                }
              }
            }
          }
          if (data["#"] != null) {
            for (var j = 0; j < data["#"].length; j++) {
              if (data["#"][j].remarkName != null) {
                this.remarklist.push(data["#"][j])
              }
            }
            this.list.push("#");
          }
          localStorage.setItem(localStorage.getItem("wechatId") + "remarkList", JSON.stringify(this.remarklist))
          // console.log(this.list);
        } else {
          this.common.presentAlert(data["respMsg"])
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
    // console.log("hide")
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
    // console.log("show")
  }
  /**
   * 
   * @param wechatId 删除好友
   */
  deleteFriend(wechatId: any) {
    let path = globalVar.baseUrl + "/addressList/deleteFriend"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", wechatId)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit("登陆超时,请重新登陆");
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.removeChat(wechatId);
          this.getFriendList();
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  initStatus() {
    this.removeMsg = "删除"
  }
  deleteConfirm(wechatId) {
    if (this.removeMsg == "删除") {
      this.removeMsg = "确认删除"
    }
    else {
      this.deleteFriend(wechatId)
    }
  }
  /**
   * 
   * @param wechatId 移除聊天室
   */
  removeChat(wechatId: any) {
    var i = -1
    for (var p in this.searchFriendList) {
      i = i + 1;
      if (this.searchFriendList[p].wechatId == wechatId) {
        this.searchFriendList.splice(i, 1)
      }
    }
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
  /**
   * 搜索好友
   */
  searchFriend() {
    if (this.searchText == "") {
      return;
    }
    // console.log(this.friendLists)
    this.searchFriendList = [];
    // console.log(this.searchText);
    for (var j in this.list) {
      for (var p in this.friendLists[this.list[j]]) {
        if (this.friendLists[this.list[j]][p].remarkName.match(this.searchText) || this.friendLists[this.list[j]][p].userName.match(this.searchText) || this.friendLists[this.list[j]][p].wechatId.match(this.searchText)) {
          this.searchFriendList.push(this.friendLists[this.list[j]][p])
        }
      }
    }
    // console.log(this.searchFriendList)
  }
  ionViewDidLeave() {
    // console.log("ionViewDidLeave")
    this.show();
  }
}
