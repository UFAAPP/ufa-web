import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { LawSuitModule } from '../lawsuit/lawsuit.module';
import { ContactsModule } from '../contacts/contacts.module';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DashboardRoutingModule,
    HttpClientModule,
    MatCardModule,
    LawSuitModule,
    ContactsModule,
  ],
  providers: [AuthGuard],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
