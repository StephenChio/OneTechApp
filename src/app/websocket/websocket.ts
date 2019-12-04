import { Injectable } from '@angular/core';
/**
 * websocket服务
 */

@Injectable()
export class WebSocketService {
 
  ws:WebSocket

  websocketUrl = "ws://localhost:8235"
  // websocketUrl = "ws://106.13.211.195:8235"
 
  constructor(){
 
  }
  createObservableSocket(url:string):WebSocket{
    this.ws = new WebSocket(this.websocketUrl+url);
    // this.presentAlert("ws连接成功")
    return this.ws;
  }
}