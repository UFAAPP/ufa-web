import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorI18nService } from 'src/app/common/mat-paginator-i18n.service';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { LockersRoutingModule } from './lockers-routing.module';
import { LockersComponent } from './lockers.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NewLockerComponent } from './components/new-locker/new-locker.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    LockersRoutingModule,
    HttpClientModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [LockersComponent, NewLockerComponent],
  providers: [
    AuthGuard,
    { provide: MatPaginatorIntl, useValue: MatPaginatorI18nService() }, // Here
  ],
  exports: [LockersComponent],
})
export class LockersModule {}
