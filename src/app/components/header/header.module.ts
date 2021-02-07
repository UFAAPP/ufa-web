import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarModule } from '../sidebar/sidebar.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    BrowserModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class HeaderModule {}
