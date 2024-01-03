import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as Common from '../../assets/common/common-constants';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!localStorage.getItem(Common.Constant.ACCESS_TOKEN)) {
            this.router.navigate([Common.Constant.LOGIN]);
            return false;
        } else {
            this.auth.checkToken().subscribe((response: any): any => {
                if (response.result.status == 404) {
                    this.router.navigate([Common.Constant.LOGIN]);
                    return false;
                }
            });
        }
        
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(route, state);
    }
}
