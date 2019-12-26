import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-text-moments',
  templateUrl: './text-moments.page.html',
  styleUrls: ['./text-moments.page.scss'],
})
export class TextMomentsPage implements OnInit {

  constructor(private router: Router, private imagePicker: ImagePicker, private activatedRoute: ActivatedRoute, private globalVar: globalVar, private http: HttpClient, private common: Common) { }
  text: string;
  pictureMoments = null;
  title = "发表文字"
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      if (data.type == "picture") {
        this.title = null;
        this.choosePicture();
      }
    });
  }
  choosePicture() {
    const option = {
      maximumImagesCount: 9,	// 可选择的图片数量默认 15，1为单选
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
      if (results.length == 0) {
        this.router.navigate(['/moments'])
      }
      this.pictureMoments = results
    }, (err) => {
      this.router.navigate(['/moments'])
    });
  }
  publish() {
    let path = globalVar.baseUrl + "/moments/publish"
    if ((this.text == null || this.text == "" || typeof (this.text) == "undefined") && this.title == "发表文字") {
      this.common.presentAlert("文本内容请勿为空")
      return;
    }
    if (this.text == null || this.text == "" || typeof (this.text) == "undefined") {
      this.text = "";
    }
    if(this.text.length>=120){
      this.common.presentAlert("请勿输入超过120个字")
      return;
    }
    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId"))
      .set("text", this.text)
      .set("pictureMoments", this.pictureMoments);

    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"])
        this.text = "";
        this.router.navigate(['/moments'])
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
  }
}
