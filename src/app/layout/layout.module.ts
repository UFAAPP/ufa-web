import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { FullPageComponent } from './full-page/full-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild([]),
    SidebarModule,
    HeaderModule
  ],
  exports: [MainLayoutComponent, FullPageComponent],
  declarations: [MainLayoutComponent, FullPageComponent],
})
export class LayoutModule {}
