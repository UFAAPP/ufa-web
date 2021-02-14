import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './pages/login/login.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { ContactsModule } from './pages/contacts/contacts.module';
import { LawSuitModule } from './pages/lawsuit/lawsuit.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    LoginModule,
    DashboardModule,
    ContactsModule,
    LawSuitModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
