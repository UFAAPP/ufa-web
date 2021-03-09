import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationInterceptor } from './common/interceptor/authorization-interceptor';
import { LayoutModule } from './layout/layout.module';
import { ContactsModule } from './pages/contacts/contacts.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LawSuitModule } from './pages/lawsuit/lawsuit.module';
import { LoginModule } from './pages/login/login.module';
import { ProfileModule } from './pages/profile/profile.module';
import { LockersComponent } from './pages/lockers/lockers.component';
import { LockersModule } from './pages/lockers/lockers.module';

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
    LawSuitModule,
    ProfileModule,
    LockersModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
