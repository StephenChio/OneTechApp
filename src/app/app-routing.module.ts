import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from './guard/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule',canActivate: [LoginGuardGuard]},
  { path: 'information-page', loadChildren: './information-page/information-page.module#InformationPagePageModule',canActivate: [LoginGuardGuard]},
  { path: 'pay', loadChildren: './pay/pay.module#PayPageModule',canActivate: [LoginGuardGuard]},
  { path: 'collect', loadChildren: './collect/collect.module#CollectPageModule',canActivate: [LoginGuardGuard] },
  { path: 'album', loadChildren: './album/album.module#AlbumPageModule' ,canActivate: [LoginGuardGuard]},
  { path: 'card', loadChildren: './card/card.module#CardPageModule',canActivate: [LoginGuardGuard] },
  { path: 'expression', loadChildren: './expression/expression.module#ExpressionPageModule' ,canActivate: [LoginGuardGuard]},
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule',canActivate: [LoginGuardGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'moments', loadChildren: './moments/moments.module#MomentsPageModule' ,canActivate: [LoginGuardGuard]},
  { path: 'add-friend-page', loadChildren: './add-friend-page/add-friend-page.module#AddFriendPagePageModule',canActivate: [LoginGuardGuard] },
  { path: 'friend-card', loadChildren: './friend-card/friend-card.module#FriendCardPageModule' ,canActivate: [LoginGuardGuard]},
  { path: 'friend-verification', loadChildren: './friend-verification/friend-verification.module#FriendVerificationPageModule' ,canActivate: [LoginGuardGuard]},
  { path: 'new-friend', loadChildren: './new-friend/new-friend.module#NewFriendPageModule' ,canActivate: [LoginGuardGuard]},
  { path: 'chat-page', loadChildren: './chat-page/chat-page.module#ChatPagePageModule' ,canActivate: [LoginGuardGuard]},
  { path: 'friend-settings', loadChildren: './friend-settings/friend-settings.module#FriendSettingsPageModule',canActivate: [LoginGuardGuard] },
  { path: 'set-name-page', loadChildren: './set-name-page/set-name-page.module#SetNamePagePageModule' },
  { path: 'update-picture', loadChildren: './update-picture/update-picture.module#UpdatePicturePageModule' },
  { path: 'text-moments', loadChildren: './text-moments/text-moments.module#TextMomentsPageModule' },
  { path: 'chat-info', loadChildren: './chat-info/chat-info.module#ChatInfoPageModule' },
  { path: 'popover-page', loadChildren: './popover-page/popover-page.module#PopoverPagePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
