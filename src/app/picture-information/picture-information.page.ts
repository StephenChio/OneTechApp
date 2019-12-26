import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalVar } from 'src/globalVar';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-picture-information',
  templateUrl: './picture-information.page.html',
  styleUrls: ['./picture-information.page.scss'],
})
export class PictureInformationPage implements OnInit {

  constructor(private router: Router, private common: Common, private http: HttpClient, private alertController: AlertController, private actionSheetController: ActionSheetController, private globalVar: globalVar, private activatedRoute: ActivatedRoute) { }
  pictures: any;
  picture: any;
  baseUrl: any;
  start = 1;
  all: any;
  title: any;
  page: any;
  text: any;
  pictureId: any;
  type: any
  id: any;
  wechatId: any;
  ngOnInit() {
    this.baseUrl = this.baseUrl = globalVar.baseUrl
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.wechatId = data.wechatId;
      this.id = data.momentId;
      this.pictures = data.pictures;
      // this.picture = data.picture;
      this.pictureId = data.pictureId;
      this.text = data.text;
      this.title = data.time;
      this.all = this.pictures.length;
      this.page = this.start + "/" + this.all
    });

  }
  /**
   * 
   * @param i 下一张图片
   */
  ionSlideNextEnd(i: any) {
    this.start = this.start + 1;
    this.page = this.start + "/" + this.all
    // console.log("next")
  }
  /**
   * 
   * @param i 上一张图片
   */
  ionSlidePrevEnd(i: any) {
    this.start = this.start - 1;
    this.page = this.start + "/" + this.all
    // console.log("prev")
  }
  selectActionSheet() {
    if (this.wechatId == localStorage.getItem("wechatId")) {
      this.personalActionSheet();
    }
    else {
      this.otherActionSheet();
    }
  }
  async otherActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: '发送给朋友',
        // icon: 'share',
        handler: () => {

        }
      },
      {
        text: '收藏',
        // icon: 'share',
        handler: () => {

        }
      },
      {
        text: '保存图片',
        // icon: 'share',
        handler: () => {

        }
      }, {
        text: '取消',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async personalActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: '设为私密照片',
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
        }
      }, {
        text: '发送给朋友',
        // icon: 'share',
        handler: () => {

        }
      },
      {
        text: '收藏',
        // icon: 'share',
        handler: () => {

        }
      },
      {
        text: '保存图片',
        // icon: 'share',
        handler: () => {

        }
      }, {
        text: '删除',
        role: 'destructive',
        // icon: 'arrow-dropright-circle',
        handler: () => {
          this.deleteConfirm(this.id)
          // console.log('Play clicked');
        }
      }, {
        text: '取消',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  /**
   * 删除确认窗口
   */
  async deleteConfirm(id:any) {
    const alert = await this.alertController.create({
      message: "与这张照片同时发布的一组照片都会被删除",
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: '全部删除',
          handler: () => {
            this.deleteMomentsById(id)
          }
        }
      ]
    });
    await alert.present();
  }
  /**
   * 删除朋友圈
   */
  deleteMomentsById(id:any) {
    let path = globalVar.baseUrl+"/moments/deleteMomentsById"
    const body = new HttpParams().set("id", id)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.common.presentAlert(data["respMsg"])
        this.router.navigate(['/album'])
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        });
  }
  clickLike() {
    let path = globalVar.baseUrl + "/comments/clickLike"
    const body = new HttpParams().set("wechatId", localStorage.getItem("wechatId")).set("momentId", this.id).set("fWechatId", this.wechatId)
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
  showDetail() {
    this.router.navigate(['/moment-information'], {
      queryParams: {
        id: this.id,
      }
    })
  }
}
