import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Common } from '../Common/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router:Router, private http: HttpClient, private common: Common) { }

  ngOnInit() {
  }
  phone: string;
  login() {
    var re = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
    if (!re.test(this.phone)) {
      this.common.presentAlert('请输入正确的手机号码。');
      return false;
    }
    else {
      console.log(this.phone)
      this.router.navigate(['/verifi-page'],{
        queryParams: { phone: this.phone }
      })
    }
  }
}
