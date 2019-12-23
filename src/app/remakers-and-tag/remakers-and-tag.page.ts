import { Component, OnInit } from '@angular/core';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-remakers-and-tag',
  templateUrl: './remakers-and-tag.page.html',
  styleUrls: ['./remakers-and-tag.page.scss'],
})
export class RemakersAndTagPage implements OnInit {

  constructor(private http:HttpClient,private common:Common,private globalVar:globalVar) { }
  remarkName:any
  phone:any
  describe:any
  ngOnInit() {
  }
  updateRemakers(){
    let path = globalVar.baseUrl + "/remark/updateRemakers"
    if(this.remarkName==null){
      this.remarkName = "";
    }
    if(this.phone==null){
      this.phone = "";
    }
    if(this.describe==null){
      this.describe = "";
    }
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", localStorage.getItem("fWechatId"))
      .set("remarkName",this.remarkName)
      .set("phone",this.phone)
      .set("describe",this.describe)

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
}
