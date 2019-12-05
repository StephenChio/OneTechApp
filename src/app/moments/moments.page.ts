import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { globalVar } from 'src/globalVar';
import { Popover } from '../Common/popover';
import { CommentComponentComponent } from '../comment-component/comment-component.component'

@Component({
  selector: 'app-moments',
  templateUrl: './moments.page.html',
  styleUrls: ['./moments.page.scss'],
})
export class MomentsPage implements OnInit {

  constructor(private popor:Popover,private activatedRoute:ActivatedRoute,private globalVar:globalVar, private imagePicker:ImagePicker,private camera:Camera, private actionSheetController: ActionSheetController, private router: Router, private http: HttpClient, private common: Common) { }
  imgPath: string;
  Moments:any;
  baseUrl:string;
  backgroundImg:string;
  ngOnInit() {
    this.imgPath = globalVar.baseUrl+"/"+localStorage.getItem("imgPath")
    this.backgroundImg = globalVar.baseUrl+"/"+localStorage.getItem("backgroundImg")
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.getMoments();
    })
  }
  doRefresh(event) {
    this.imgPath = globalVar.baseUrl+"/"+localStorage.getItem("imgPath")
    this.backgroundImg = globalVar.baseUrl+"/"+localStorage.getItem("backgroundImg")
    this.getMoments();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  showInfo(wechatId:any,userName:any,imgPath:any){
    this.router.navigate(['/friend-card'],{
      queryParams:{
        wechatId:wechatId,
        userName:userName,
        imgPath:imgPath,
        type:"sendMsg"
      }
    })
  }
  getMoments(){
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
  updateBackgroundImg(backgroundImg:any){
    let path = globalVar.baseUrl+"/userInfo/updateBackgroundImg"
    this.baseUrl = globalVar.baseUrl;
    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId"))
    .set("backgroundImg",backgroundImg)

    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"])
        this.backgroundImg = globalVar.baseUrl+"/"+data["data"].backgroundImg;
        localStorage.setItem("backgroundImg",data["data"].backgroundImg)
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
      });
  }
  async selectBackground(){
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
      text: '从手机相册选择',
      // icon: 'share',
      handler: () => {
        const option = {
          maximumImagesCount: 1,	// 可选择的图片数量默认 15，1为单选
          // width : 400  ,		// 图片宽
          // height : 500 ,		//图片高
          quality: 100,		//图片质量，质量越高图片越大,请根据实际情况选择
          outputType: 1
          /** 文件输出类型，你可以选择图片URL，或者base64的文件编码
          这里建议选择文件编码  0  ：文件地址  1：图片base64编码*/
        }
  
        this.imagePicker.getPictures(option).then((results) => {
          /**这里results返回的是一个数组，可以通过  results.pop()返回最后一个值，shift()返回第一个值，如果你只允许选择一个图片的话
          ，两者都是可以的，为了程序健壮性，这里建议你对results的长度进行判断处理。*/
          this.updateBackgroundImg(results)
        }, (err) => { });
        }
    }, {
      text: '取消',
      // icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  })
  await actionSheet.present();
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
  showComments(id:any){
    localStorage.setItem("momentId",id);
    // this.popor.presentPopover(CommentComponentComponent);
  }
  clickLike(momentId:any){
    let path = globalVar.baseUrl+"/comments/clickLike"
    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId")).set("momentId",momentId)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"])
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
      });
  }
}
