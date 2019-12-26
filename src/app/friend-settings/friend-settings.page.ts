import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-friend-settings',
  templateUrl: './friend-settings.page.html',
  styleUrls: ['./friend-settings.page.scss'],
})
export class FriendSettingsPage implements OnInit {

  constructor(private actionSheetController:ActionSheetController,private globalVar:globalVar,private http: HttpClient, private common: Common) { }

  ngOnInit() {
  }
  isBlack = false;
  async deleteConfirm() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: '确认删除',
        role: 'destructive',
        // icon: 'share',
        handler: () => {
          this.deleteFriend()
        }
      }, {
        text: '取消',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    })
    await actionSheet.present();
  }
  /**
   * 删除好友
   */
  deleteFriend() {
    let path = globalVar.baseUrl+"/addressList/deleteFriend";
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", localStorage.getItem("fWechatId"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        this.removeChat(localStorage.getItem("fWechatId"));
        this.common.presentAlert(data["respMsg"]);
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试");
        })
  }
  addBlack(){
    
  }
  /**
   * 移除聊天内容
   * @param wechatId 
   */
  removeChat(wechatId:any){
    var chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId")+"chats"));
    for(var p in chatsGroup){
      if(chatsGroup[p].wechatId == wechatId){
        chatsGroup.splice(p,1);
        // delete this.chatsGroup[p];
        localStorage.setItem(localStorage.getItem("wechatId") + "chats", JSON.stringify(chatsGroup));
        localStorage.removeItem(localStorage.getItem("wechatId")+wechatId);
      }
    }
  }
}
