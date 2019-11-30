import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../websocket/websocket';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private router:Router,private ws:WebSocketService) {}
  momentsNum = null;
  webSocket = null;
  ngOnInit(){
    var _this = this;
    const url = "/websocket/socketServer?WS_NAME=tab3" + localStorage.getItem("wechatId")
    this.webSocket = this.ws.createObservableSocket(url)
    this.webSocket.onmessage = function (event: any) {
      if(_this.momentsNum == null){
        _this.momentsNum == 0;
      }
      _this.momentsNum = _this.momentsNum + 1
      console.log(_this.momentsNum)
    }
  }
  moments(){
  this.momentsNum = null;
  this.router.navigate(['/moments']);
  }
}
