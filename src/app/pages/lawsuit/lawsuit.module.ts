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
import { NewLawsuitComponent } from './components/new-lawsuit/new-lawsuit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Utils } from 'src/app/common/utils';
import { PipesModule } from 'src/app/pipes/court/pipesModule.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TableProgressComponent } from './components/table-progress/table-progress.component';
import { TableArchivedComponent } from './components/table-archived/table-archived.component';
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
    MatDialogModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatAutocompleteModule,
    PipesModule,
    MatTabsModule,
  ],
  declarations: [
    LawsuitComponent,
    NewLawsuitComponent,
    TableProgressComponent,
    TableArchivedComponent,
  ],
  providers: [
    AuthGuard,
    { provide: MatPaginatorIntl, useValue: MatPaginatorI18nService() },
    Utils,
  ],
  exports: [LawsuitComponent],
})
export class LawSuitModule {}
