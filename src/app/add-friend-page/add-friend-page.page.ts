import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friend-page',
  templateUrl: './add-friend-page.page.html',
  styleUrls: ['./add-friend-page.page.scss'],
})
export class AddFriendPagePage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private globalVar: globalVar) { }

  ngOnInit() {
  }
  hide() {
    var title = document.getElementById("addFriendTitle");
    title.style.display = "none"
  }
  show() {
    var title = document.getElementById("addFriendTitle");
    title.style.removeProperty("display")
  }
  searchContext: string;
  isExit = true;
  Array = []
  ionChange() {
    this.isExit=true;
  }
  searchFriend() {
    let path = globalVar.baseUrl + "/userInfo/searchFriend"

    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId")).set("searchContext", this.searchContext)
    console.log(body);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == "00") {
          console.log(data)
          if (data["data"].length>0) {
            this.router.navigate(['/friend-card'],
              {
                queryParams: { fWechatId: data["data"][0].wechatId, fUserName: data["data"][0].userName, imgPath: data["data"][0].imgPath }
              })
          }
          else{
            this.isExit = false;
          }
        }
        else {
          alert("搜索异常")
          console.log(data["respMsg"]);
        }
      });
  }
}

