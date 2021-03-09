import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LawsuitComponent } from './lawsuit.component';
import { LawSuitRoutingModule } from './lawsuit-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { MatPaginatorI18nService } from 'src/app/common/mat-paginator-i18n.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    LawSuitRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [LawsuitComponent],
  providers: [
    AuthGuard,
    { provide: MatPaginatorIntl, useValue: MatPaginatorI18nService() }, // Here
  ],
  exports: [LawsuitComponent],
})
export class LawSuitModule {}
