import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-safe',
  templateUrl: './account-safe.page.html',
  styleUrls: ['./account-safe.page.scss'],
})
export class AccountSafePage implements OnInit {

  constructor() { }
  wechatId:any;
  phone:any;
  ngOnInit() {
    this.wechatId = localStorage.getItem("wechatId")
    this.phone = localStorage.getItem("phone")
  }

}
