import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-change-phone-page',
  templateUrl: './change-phone-page.page.html',
  styleUrls: ['./change-phone-page.page.scss'],
})
export class ChangePhonePagePage implements OnInit {

  constructor(private router:Router,private http:HttpClient,private common:Common,private globalVar:globalVar,private activatedRoute:ActivatedRoute) { }
  phone:any;
  newPhone:any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.phone = data.phone;
    })
  }
  getVerifiCode(){
    var re = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
    if (!re.test(this.newPhone)) {
      this.common.presentAlert('请输入正确的手机号码。');
      return false;
    }
    if(this.newPhone == this.phone){
      this.common.presentAlert("请勿重复绑定手机");
      return false;
    }
    let path = globalVar.baseUrl + "/getVerifiCode"
    const body = new HttpParams().set("phone", this.newPhone)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == "00") {
          this.router.navigate(['/write-verifi-code'],{
            queryParams:{
              phone:this.newPhone
            }
          })
        }
        else {
          this.common.presentAlert(data["respMsg"]);
        }
      },
        error => {
          this.common.presentAlert("系统繁忙,请重试");
        }
      );
  }
}
