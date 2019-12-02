import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx'
import { ActionSheetController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
@Component({
  selector: 'app-update-picture',
  templateUrl: './update-picture.page.html',
  styleUrls: ['./update-picture.page.scss'],
})
export class UpdatePicturePage implements OnInit {

  constructor(private camera:Camera, private http: HttpClient, private common: Common, private globalVar: globalVar, private imagePicker: ImagePicker, private actionSheetController: ActionSheetController) { }
  imgPath: string;
  baseUrl: string;
  ngOnInit() {
    this.imgPath = globalVar.baseUrl+"/"+localStorage.getItem("imgPath")
    this.baseUrl = globalVar.baseUrl;
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: '拍照',
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
            const option = {
                quality: 100,
                destinationType : 0,  //0 返回base64编码字符串。1 返回图片文件URI。2 返回图片本机URI。
            }
          this.camera.getPicture(option)
              .then((imgUrl)=>{
                console.log(imgUrl);
              })
              .catch((err)=>{
                console.log(err)
              })
          console.log('Delete clicked');
        }
      }, {
        text: '相册',
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

            let path = globalVar.baseUrl + "/userInfo/updatePicture"
            const body = new HttpParams()
              .set("wechatId", localStorage.getItem("wechatId"))
              .set("imgPath", "data:image/jpeg;base64,"+results)
              
            let httpOptions = {
              headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
            this.http.post(path, body, httpOptions)
              .subscribe(data => {
                alert(data["respMsg"])
                this.imgPath = globalVar.baseUrl+"/"+data["data"].imgPath;
                alert(data["data"].imgPath);
                localStorage.setItem("imgPath",data["data"].imgPath)
              },
                error => {
                  this.common.presentAlert("服务器繁忙,请重试")
                })
          }, (err) => { });
        }
      }, {
        text: '保存',
        // icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
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
