import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as Common from '../../assets/common/common-constants';
// @ts-ignore
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data[Common.Constant.EXPECTED_ROLE];
        const token: any = localStorage.getItem(Common.Constant.ACCESS_TOKEN);
        if (token == null || token == undefined || token.length < 1) {
            this.router.navigate([Common.Constant.LOGIN]);
            return false;
        } else {
            // decode the token to get its payload
            const tokenPayload: any = jwtDecode(token);
            if(tokenPayload.data.account_role !== expectedRole) {
                this.router.navigate([Common.Constant.LOGIN]);
                return false;
            }
        }
        return true;
    }
}
