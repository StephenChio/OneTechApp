import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.page.html',
  styleUrls: ['./moments.page.scss'],
})
export class MomentsPage implements OnInit {

  constructor(private globalVar:globalVar, private imagePicker:ImagePicker,private camera:Camera, private actionSheetController: ActionSheetController, private router: Router, private http: HttpClient, private common: Common) { }
  imgPath: string;
  Moments:any;
  baseUrl:string;
  ngOnInit() {
    this.imgPath = globalVar.baseUrl+"/"+localStorage.getItem("imgPath")
    let path = globalVar.baseUrl+"/moments/getMoments"
    this.baseUrl = globalVar.baseUrl;
    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId"))

    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        console.log(data["data"])
        this.Moments = data["data"];
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: '文字',
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          this.router.navigate(['/text-moments']);
        }
      }, {
        text: '拍照',
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          const options = {
            quality: 100,
            destinationType: 0,
            encodingType: 1
          }
          this.camera.getPicture(options).then((imageData) => {
            let ImageBase = 'data:image/jpeg;base64,' + imageData;
            console.log(ImageBase)
          }, (err) => {
           // Handle error
           console.log("Camera issue:" + err);
          });
        }
      }, {
        text: '从手机相册选择',
        // icon: 'share',
        handler: () => {
            this.router.navigate(['/text-moments'],{
              queryParams:{
                type:"picture"
              }
            })
          }
      }, {
        text: '取消',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
