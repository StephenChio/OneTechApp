import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-phone-settings',
  templateUrl: './phone-settings.page.html',
  styleUrls: ['./phone-settings.page.scss'],
})
export class PhoneSettingsPage implements OnInit {

  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }
  phone:any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.phone = data.phone;
    })
  }
  ionWillEnter(){
    this.phone = localStorage.getItem("phone")
  }
  changePhoneNum(){
    this.router.navigate(['/change-phone-page'],{
      queryParams:{
        phone:this.phone
      }
    })
  }
}
