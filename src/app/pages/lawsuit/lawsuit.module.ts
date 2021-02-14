import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LawsuitComponent } from './lawsuit.component';
import { LawSuitRoutingModule } from './lawsuit-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
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
  ],
  declarations: [LawsuitComponent],
  exports: [LawsuitComponent],
})
export class LawSuitModule {}
