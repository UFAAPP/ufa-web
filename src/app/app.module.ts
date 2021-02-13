import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './pages/login/login.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactsModule } from './pages/contacts/contacts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    LoginModule,
    DashboardModule,
    ContactsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
