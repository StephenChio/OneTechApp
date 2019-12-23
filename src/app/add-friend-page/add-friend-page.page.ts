import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Router } from '@angular/router';
import { Common } from '../Common/common';

@Component({
  selector: 'app-add-friend-page',
  templateUrl: './add-friend-page.page.html',
  styleUrls: ['./add-friend-page.page.scss'],
})
export class AddFriendPagePage implements OnInit {

  constructor(private common: Common, private router: Router, private http: HttpClient, private globalVar: globalVar) { }
  searchContext: string;
  isExit = true;
  Array = []
  ngOnInit() {
  }
  /**
   * 隐藏界面
   */
  hide() {
    var title = document.getElementById("addFriendTitle");
    title.style.display = "none"
  }
  /**
   * 显示界面
   */
  show() {
    var title = document.getElementById("addFriendTitle");
    title.style.removeProperty("display")
  }
  /**
   * 改变搜索状态
   */
  ionChange() {
    this.isExit = true;
  }
  /**
   * 搜索账号
   */
  searchFriend() {
    let path = globalVar.baseUrl + "/userInfo/searchFriend"

    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId")).set("searchContext", this.searchContext)
    // console.log(body);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        // console.log(data)
        if (data["data"].length > 0) {
          this.router.navigate(['/friend-card'],
            {
              queryParams: { wechatId: data["data"][0].wechatId, userName: data["data"][0].userName, imgPath: data["data"][0].imgPath }
            })
        }
        else {
          this.isExit = false;
        }
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
  }
}

