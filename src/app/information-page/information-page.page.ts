import { Component, OnInit } from '@angular/core';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.page.html',
  styleUrls: ['./information-page.page.scss'],
})
export class InformationPagePage implements OnInit {

  constructor(private globalVar:globalVar) { }
  userName: string;
  wechatId: string;
  imgPath: string;
  baseUrl:string;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl
    this.userName = window.localStorage.getItem("userName");
    this.wechatId = window.localStorage.getItem("wechatId");
    this.imgPath = window.localStorage.getItem("imgPath");
  }

}
