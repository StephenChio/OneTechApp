import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../websocket/websocket';
import { PopoverController } from '@ionic/angular';
import { PopComponentComponent } from '../pop-component/pop-component.component';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private globalVar:globalVar,private popoverController: PopoverController, private router: Router, private ws: WebSocketService) { }
  wechatId: any;
  chatsGroup: any;
  websocket = null;
  baseUrl:string;
  ngOnInit() {
    var _this = this
    this.baseUrl = globalVar.baseUrl;
    this.chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "chats"))
    const url = "/websocket/socketServer?wechatId=tab1" + localStorage.getItem("wechatId")
    this.websocket = this.ws.createObservableSocket(url)
    this.websocket.onmessage = function (event: any) {
      var resBody = JSON.parse(event.data)
      var chats = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + resBody.wechatId))
      var body = { wechatId: resBody.wechatId, imgPath: resBody.imgPath, msg: resBody.msg }
      _this.chatsGroup = JSON.parse(localStorage.getItem(resBody.fWechatId + "chats"))
      if (chats == null) {
        chats = []
        if (_this.chatsGroup == null) {
          _this.chatsGroup = []
        }
        _this.chatsGroup.push({ wechatId: resBody.wechatId, fUserName: resBody.userName, lastMsg: resBody.msg, msgNum: 1, imgPath: resBody.imgPath })
        chats.push(body);
        localStorage.setItem(localStorage.getItem("wechatId") + resBody.wechatId, JSON.stringify(chats))
      }
      else {
        // console.log(resBody.wechatId)
        chats.push(body);
        localStorage.setItem(localStorage.getItem("wechatId") + resBody.wechatId, JSON.stringify(chats))
        var flag = false
        for (var p in _this.chatsGroup) {
          if (_this.chatsGroup[p].wechatId == resBody.wechatId) {
            _this.chatsGroup[p].lastMsg = resBody.msg
            if (_this.chatsGroup[p].msgNum == null) {
              _this.chatsGroup[p].msgNum = 1
            }
            else {
              _this.chatsGroup[p].msgNum = _this.chatsGroup[p].msgNum + 1
            }
            flag = true
          }
        }
        if (!flag) {
          _this.chatsGroup.push({ wechatId: resBody.wechatId, fUserName: resBody.userName, lastMsg: resBody.msg, msgNum: 1, imgPath: resBody.imgPath })
        }
      }
      localStorage.setItem(resBody.fWechatId + "chats", JSON.stringify(_this.chatsGroup))
    }
  }
  hide() {
    var title = document.getElementById("tab1Title");
    title.style.display = "none"
    console.log("hide")
  }
  show() {
    var title = document.getElementById("tab1Title");
    title.style.removeProperty("display")
    console.log("show")
  }
  showChat(fUserName: any, fWechatId: any, imgPath: any) {
    localStorage.setItem('fUserName', fUserName);
    localStorage.setItem('fWechatId', fWechatId);
    var wechatId = localStorage.getItem("wechatId");
    this.chatsGroup = JSON.parse(localStorage.getItem(wechatId + "chats"))
    for (var p in this.chatsGroup) {
      if (this.chatsGroup[p].wechatId == fWechatId) {
        this.chatsGroup[p].msgNum = null
      }
    }
    localStorage.setItem(wechatId + "chats", JSON.stringify(this.chatsGroup))
    this.router.navigate(['/chat-page'],
      {
        queryParams: { imgPath: imgPath }
      });
  }
  ionViewWillEnter() {
    this.chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "chats"))
    console.log(this.chatsGroup)
  }
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopComponentComponent,
      translucent: true
    });
    return await popover.present();
  }
  ionViewWillLeave() {
  }
}
