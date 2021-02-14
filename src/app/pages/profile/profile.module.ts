import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ProfileRoutingModule,
    HttpClientModule,

  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class ProfileModule {}
