import { Component, OnInit } from '@angular/core';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  constructor(private router:Router,private common: Common, private http: HttpClient, private globalVar: globalVar, private activatedRoute: ActivatedRoute) { }
  wechatId: string;
  Moments: any;
  userName: string;
  imgPath: string;
  backgroundImg: string;
  baseUrl: string;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl
    this.wechatId = localStorage.getItem("wechatId")
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.getMomentsPictureByWechatId(this.wechatId )
    })
    this.getMomentsPictureByWechatId(this.wechatId)
  }
  getMomentsPictureByWechatId(wechatId: any) {
    let path = globalVar.baseUrl + "/moments/getMomentsPictureByWechatId"

    const body = new HttpParams().set("wechatId", wechatId)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        // console.log(data)
        this.Moments = data["data"];
        this.imgPath = globalVar.baseUrl + "/" + data["data"][0].imgPath;
        this.userName = data["data"][0].userName;
        this.backgroundImg = globalVar.baseUrl + "/" + data["data"][0].backgroundImg;

      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
  }
  showPicInfo(momentId:any,wechatId:any,pictureId:any,pictures:any,picture:any,text:any,time:any){
    // console.log(pictures)
    // console.log(momentId)
    this.router.navigate(['/picture-information'],{
      queryParams:{
        wechatId:wechatId,
        pictures:pictures,
        picture:picture,
        time:time,
        pictureId:pictureId,
        text:text,
        momentId:momentId
      }
    })
  }
}
