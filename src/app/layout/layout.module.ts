import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FullPageComponent } from './full-page/full-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthService } from '../common/services/authentication/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild([]),
    MatSidenavModule,
    MatListModule,
    MatCardModule,
  ],
  exports: [MainLayoutComponent, FullPageComponent],
  declarations: [MainLayoutComponent, FullPageComponent],
  providers: [AuthService],
})
export class LayoutModule {}
