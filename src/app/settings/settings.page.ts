import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  quit(){
    var storage = window.localStorage;
    storage.removeItem("user_token");
    window.location.href="login"
  }
}
