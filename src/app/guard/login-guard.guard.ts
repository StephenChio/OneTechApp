import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate{
  constructor(private router:Router, private nav:NavController){

  }
  /**
   * 
   * @param route 登陆守卫 为登陆时调整登陆页面
   * @param state 
   */
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // console.log("login")
    const token = window.localStorage.getItem('user_token');
    if (token == null || token === undefined) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
