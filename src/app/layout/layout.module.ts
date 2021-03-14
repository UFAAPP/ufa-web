import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FullPageComponent } from './full-page/full-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthService } from '../common/services/authentication/auth.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AvatarModule } from 'ngx-avatar';

const avatarColors = ['#ff0000'];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild([]),
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    AvatarModule.forRoot({
      colors: avatarColors,
    }),
  ],
  exports: [MainLayoutComponent, FullPageComponent],
  declarations: [MainLayoutComponent, FullPageComponent],
  providers: [AuthService],
})
export class LayoutModule {}
