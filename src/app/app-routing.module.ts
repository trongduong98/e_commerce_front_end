import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/client-pages/home-page/home-page.component';
import { AboutPageComponent } from './components/client-pages/about-page/about-page.component';
import { DashboardAdminComponent } from './components/admin-page/dashboard-admin/dashboard-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'login', component: LoginPageComponent},
    // router for client
    {path: 'client',
        children: [
            {path: 'home_page', component: HomePageComponent},
            {path: 'about_page', component: AboutPageComponent},
        ],
        data: { 
            expectedRole: 2
        }
    },
    // router for admin
    {path: 'admin', canActivate: [RoleGuard], canActivateChild: [AuthGuard],
        children: [
            {path: 'dashboard_admin', component: DashboardAdminComponent},
        ],
        data: { 
            expectedRole: 1
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
