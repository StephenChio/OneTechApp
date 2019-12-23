import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../websocket/websocket';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private router: Router, private ws: WebSocketService) { }
  momentsNum = null;
  websocket = null;
  ngOnInit() {
    var _this = this;
    const url = "/websocket/socketServer?WS_NAME=tab3" + "and" + localStorage.getItem("wechatId")
    if (this.websocket == null) {
      this.websocket = this.ws.createObservableSocket(url)
      this.websocket.onmessage = function (event: any) {
        if (_this.momentsNum == null) {
          _this.momentsNum == 0;
        }
        _this.momentsNum = _this.momentsNum + 1
        // console.log(_this.momentsNum)
      }
    }
  }
  moments() {
    this.momentsNum = null;
    this.router.navigate(['/moments']);
  }
}
