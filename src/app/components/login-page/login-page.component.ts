import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as Common from '../../../assets/common/_index';
// @ts-ignore
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    constructor(private AuthService: AuthService, private router: Router) { }

    public loginInfo = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    ngOnInit(): void {
    }
    
    handelLogin() {
        this.AuthService.login(this.loginInfo.value).subscribe((data: any) => {
            if(data) {
                localStorage.setItem(Common.constants.Constant.ACCESS_TOKEN, data.result);
                const tokenPayload: any = jwtDecode(data.result);
                this.loginInfo.patchValue({
                    email: '',
                    password: '',
                });
                if (tokenPayload.data.account_role == Common.enums.Roles.admin) {
                    this.router.navigate(["/admin/dashboard_admin"]);
                }
                if (tokenPayload.data.account_role == Common.enums.Roles.client) {
                    this.router.navigate(["/client/home_page"]);
                }
            }
        });
    }

}
