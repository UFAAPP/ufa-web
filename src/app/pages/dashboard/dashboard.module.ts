import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    DashboardRoutingModule,
    HttpClientModule,
    MatCardModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
