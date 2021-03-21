import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { MatPaginatorI18nService } from 'src/app/common/mat-paginator-i18n.service';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { Utils } from 'src/app/common/utils';
import { PipesModule } from 'src/app/pipes/pipesModule.module';
import { LawsuitEditModalComponent } from './components/lawsuit-edit-modal/lawsuit-edit-modal.component';
import { LawsuitNewModalComponent } from './components/lawsuit-new-modal/lawsuit-new-modal.component';
import { TableArchivedComponent } from './components/table-archived/table-archived.component';
import { TableProgressComponent } from './components/table-progress/table-progress.component';
import { LawSuitRoutingModule } from './lawsuit-routing.module';
import { LawsuitComponent } from './lawsuit.component';
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
    LawsuitNewModalComponent,
    TableProgressComponent,
    TableArchivedComponent,
    LawsuitEditModalComponent,
  ],
  providers: [
    AuthGuard,
    { provide: MatPaginatorIntl, useValue: MatPaginatorI18nService() },
    Utils,
  ],
  exports: [LawsuitComponent],
})
export class LawSuitModule {}
