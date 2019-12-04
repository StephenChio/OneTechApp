import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-friend-settings',
  templateUrl: './friend-settings.page.html',
  styleUrls: ['./friend-settings.page.scss'],
})
export class FriendSettingsPage implements OnInit {

  constructor(private globalVar:globalVar,private http: HttpClient, private common: Common) { }

  ngOnInit() {
  }
  isBlack = false;
  deleteFriend() {
    let path = globalVar.baseUrl+"/addressList/deleteFriend"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", localStorage.getItem("fWechatId"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"])
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  addBlack(){
    
  }
}
