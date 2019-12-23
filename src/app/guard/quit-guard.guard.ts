import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class QuitGuardGuard implements CanActivate {
  constructor(private router: Router, private nav: NavController) {

  }
  /**
   * 
   * @param route 登陆守卫 登陆以后禁止跳转登陆页面
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("123")
    const token = window.localStorage.getItem('user_token');
    if (token == null || token === undefined) {
      return true;
    }else{
      this.router.navigate(['/tabs/tab1']);
      return false
    }
  }
}
