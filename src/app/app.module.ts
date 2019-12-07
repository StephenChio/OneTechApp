import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { ImagePicker} from '@ionic-native/image-picker/ngx'
import { globalVar } from 'src/globalVar';
import { PopComponentComponent } from './pop-component/pop-component.component';
import { Common } from './Common/common';
import { Popover } from './Common/popover';
import { CommentComponentComponent } from './comment-component/comment-component.component';
import { QuitGuardGuard } from './guard/quit-guard.guard';
@NgModule({
  declarations: [AppComponent,PopComponentComponent,CommentComponentComponent],
  entryComponents: [PopComponentComponent,CommentComponentComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginGuardGuard,
    QuitGuardGuard,
    Camera,
    ImagePicker,
    globalVar,
    Common,
    Popover
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
