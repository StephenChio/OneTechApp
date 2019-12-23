import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebSocketService } from '../websocket/websocket';
import { Common } from '../Common/common';
import { ActivatedRoute, Router } from '@angular/router';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {

  constructor(private globalVar: globalVar, private router: Router, private http: HttpClient, private ws: WebSocketService, private common: Common, private activatedRoute: ActivatedRoute) { }
  fUserName: any;
  wechatId: any;
  fWechatId: any;
  msg: string;
  imgPath: any;
  websocket = null;
  chats = []
  baseUrl: string;
  ngOnInit() {
    var _this = this;
    this.baseUrl = globalVar.baseUrl;
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.imgPath = data.imgPath;
      this.fUserName = data.name;
      // console.log(this.imgPath)
    });
    this.wechatId = localStorage.getItem('wechatId');
    this.fWechatId = localStorage.getItem('fWechatId');
    this.chats = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + this.fWechatId))
    if (this.chats == null) {
      this.chats = []
      localStorage.setItem(localStorage.getItem("wechatId") + this.fWechatId, JSON.stringify(this.chats))
      var chatsGroup = JSON.parse(localStorage.getItem(this.wechatId + "chats"))
      if (chatsGroup == null) {
        chatsGroup = [{ wechatId: this.fWechatId, fUserName: this.fUserName, lastMsg: "", msgNum: null, imgPath: this.imgPath }]
      }
      else {
        chatsGroup.push({ wechatId: this.fWechatId, fUserName: this.fUserName, lastMsg: "", msgNum: null, imgPath: this.imgPath })
      }
      localStorage.setItem(this.wechatId + "chats", JSON.stringify(chatsGroup))
    }
    /**
     * websocket连接
     */
    const url = "/websocket/socketServer?WS_NAME=chatPage" + "and" + localStorage.getItem("wechatId") + "and" + localStorage.getItem("fWechatId")
    this.websocket = this.ws.createObservableSocket(url)
    /**
     * websocket连接响应
     */
    this.websocket.onmessage = function (event: any) {
      // alert("收到消息")
      //   if(event.data == "02"){
      //     _this.common.presentAlert("对方不在线,无法发送消息")
      //     _this.chats = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId")+_this.fWechatId))
      //     _this.chats.splice(_this.chats.length-1,1)
      //     localStorage.setItem(localStorage.getItem("wechatId")+_this.fWechatId,JSON.stringify(_this.chats))
      //     return;
      //   }
      var resBody = JSON.parse(event.data)
      var remarkList = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "remarkList"))
      for (var p in remarkList) {
        if (remarkList[p].wechatId == resBody.wechatId) {
          resBody.userName = remarkList[p].remarkName
        }
      }
      // console.log(resBody)
      _this.chats = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + resBody.wechatId))
      // console.log(resBody.wechatId)
      var body = { wechatId: resBody.wechatId, imgPath: resBody.imgPath, msg: resBody.msg }
      _this.chats.push(body);
      localStorage.setItem(localStorage.getItem("wechatId") + resBody.wechatId, JSON.stringify(_this.chats))
      var chatsGroup = JSON.parse(localStorage.getItem(resBody.fWechatId + "chats"))
      for (var p in chatsGroup) {
        if (chatsGroup[p].wechatId == resBody.wechatId) {
          chatsGroup[p].lastMsg = resBody.msg
          chatsGroup[p].fUserName = resBody.userName
        }
      }
      localStorage.setItem(resBody.fWechatId + "chats", JSON.stringify(chatsGroup))
    }
  }
  /**
   * 离开页面时关闭长链接
   */
  ionViewWillLeave() {
    this.websocket.close();
  }
  /**
   * 发送消息
   */
  sendMsg() {
    if (this.msg == null || this.msg == '') {
      return;
    }
    else {
      var sendBody = {
        to: "chatPage" + "#" + "tab1",
        wechatId: this.wechatId,
        userName: localStorage.getItem("userName"),
        msg: this.msg,
        fWechatId: this.fWechatId,
        imgPath: localStorage.getItem("imgPath")
      }
      var body = { wechatId: this.wechatId, imgPath: localStorage.getItem("imgPath"), msg: this.msg }
      this.chats.push(body);
      var chatsGroups = JSON.parse(localStorage.getItem(this.wechatId + "chats"))
      for (var p in chatsGroups) {
        if (chatsGroups[p].wechatId == this.fWechatId) {
          chatsGroups[p].lastMsg = this.msg
        }
      }
      localStorage.setItem(this.wechatId + "chats", JSON.stringify(chatsGroups))
      localStorage.setItem(localStorage.getItem("wechatId") + this.fWechatId, JSON.stringify(this.chats))
      if (this.fWechatId == "root001") {
        this.handleRotMsg(this.msg);
        this.msg = ""
        return;
      }
      else {
        this.websocket.send(JSON.stringify(sendBody))
        this.msg = ""
      }
    }
  }
  /**
   * 打开聊天消息设置
   */
  chatInfo() {
    console.log(this.imgPath)
    this.router.navigate(['/chat-info'],
      {
        queryParams: { imgPath: this.imgPath, fUserName: this.fUserName }
      });
  }
  /**
   * 处理机器人聊天
   * @param msg 
   */
  handleRotMsg(msg: any) {
    let path = "https://api.ownthink.com/bot?spoken=spoken_text"

    var body = { "spoken": msg, "appid": "xiaosi", "userid": "user" }
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        data = data["data"]["info"].text;
        this.chats = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "root001"))
        // console.log(resBody.wechatId)
        var body = { wechatId: "root001", imgPath: "img/head.png", msg: data }
        this.chats.push(body);
        localStorage.setItem(localStorage.getItem("wechatId") + "root001", JSON.stringify(this.chats))

        var chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "chats"))
        for (var p in chatsGroup) {
          if (chatsGroup[p].wechatId == "root001") {
            chatsGroup[p].lastMsg = data
          }
        }
        localStorage.setItem(localStorage.getItem("wechatId") + "chats", JSON.stringify(chatsGroup))
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
  }
}
