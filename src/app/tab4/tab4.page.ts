import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private globalVar:globalVar) { }

  userName: string;
  wechatId: string;
  imgPath: string;
  baseUrl:string;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.userName = window.localStorage.getItem("userName");
    this.wechatId = window.localStorage.getItem("wechatId");
    this.imgPath = window.localStorage.getItem("imgPath");
  }
  ionViewWillEnter() {
    this.userName = window.localStorage.getItem("userName");
    this.imgPath = window.localStorage.getItem("imgPath");
  }
}
