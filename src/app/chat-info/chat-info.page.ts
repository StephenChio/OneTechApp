import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.page.html',
  styleUrls: ['./chat-info.page.scss'],
})
export class ChatInfoPage implements OnInit {

  constructor(private globalVar:globalVar,private activatedRoute:ActivatedRoute) { }
  imgPath:any;
  fUserName:any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      console.log(data)
      this.imgPath = globalVar.baseUrl+"/"+data.imgPath;
      this.fUserName = data.fUserName;
    });
  }
}
