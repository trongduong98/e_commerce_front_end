import { Injectable, Injector } from '@angular/core';
import * as Common from '../../assets/common/common-constants';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from './loader.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {
    constructor(private loader: LoaderService, private auth: AuthService  ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const urlLogin = req.url.slice(-5);
        const headers = new HttpHeaders()
        setTimeout(() => {
            this.loader.isLoading.next(true);
        }, 0);
        if (urlLogin === Common.Constant.LOGIN) {
            const AuthRequest: any = req.clone({headers: headers});
            return next.handle(AuthRequest).pipe(
                delay(1000),
                finalize(() => {
                    this.loader.isLoading.next(false);
                })
            );
        } else {
            const token: any = localStorage.getItem(Common.Constant.ACCESS_TOKEN);
            if (token != null || token != undefined) {
                const AuthRequest: any = req.clone({headers: headers.set(Common.Constant.AUTHORIZATION, token)});
                return next.handle(AuthRequest).pipe(
                    delay(1000),
                    finalize(() => {
                        this.loader.isLoading.next(false);
                    })
                );
            } else {
                return next.handle(req);
            }
        }
    }
}
