import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

// components
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/client-pages/home-page/home-page.component';
import { AboutPageComponent } from './components/client-pages/about-page/about-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardAdminComponent } from './components/admin-page/dashboard-admin/dashboard-admin.component';
import { InterceptorService } from './services/interceptor.service';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { DashboardHeaderComponent } from './components/admin-page/dashboard-header/dashboard-header.component';
import { DashboardNavComponent } from './components/admin-page/dashboard-nav/dashboard-nav.component';
import { DialogDeleteProductComponent } from './components/dialog-pages/dialog-delete-product/dialog-delete-product.component';
import { DialogAddEditProductComponent } from './components/dialog-pages/dialog-add-edit-product/dialog-add-edit-product.component';
import { DashboardHomeComponent } from './components/admin-page/dashboard-home/dashboard-home.component';
import { DashboardProductGroupComponent } from './components/admin-page/dashboard-product-group/dashboard-product-group.component';
import { DashboardProductComponent } from './components/admin-page/dashboard-product/dashboard-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AboutPageComponent,
    DashboardAdminComponent,
    LoadingPageComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    DialogDeleteProductComponent,
    DialogAddEditProductComponent,
    DashboardHomeComponent,
    DashboardProductGroupComponent,
    DashboardProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
