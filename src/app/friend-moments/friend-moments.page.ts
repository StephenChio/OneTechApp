import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-friend-moments',
  templateUrl: './friend-moments.page.html',
  styleUrls: ['./friend-moments.page.scss'],
})
export class FriendMomentsPage implements OnInit {

  constructor(private common:Common,private http:HttpClient,private globalVar:globalVar,private activatedRoute:ActivatedRoute) { }
  wechatId:string;
  Moments:any;
  userName:string;
  imgPath:string;
  backgroundImg:string;
  baseUrl:string;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.wechatId = data.wechatId;  //上个页面传过来的值  
      this.getFriendMoments(this.wechatId);
    })
  }
  /**
   * 得到用户朋友圈内容
   * @param wechatId 
   */
  getFriendMoments(wechatId:any){
    let path = globalVar.baseUrl+"/moments/getMomentsByWechatId"

      const body = new HttpParams().set("wechatId",wechatId)
      let httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
      this.http.post(path, body, httpOptions)
      .subscribe(data => {
        // console.log(data)
        this.Moments = data["data"];
        this.imgPath = globalVar.baseUrl+"/"+data["data"][0].imgPath;
        this.userName = data["data"][0].userName;
        this.backgroundImg = globalVar.baseUrl+"/" + data["data"][0].backgroundImg;
        
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
  }

}
