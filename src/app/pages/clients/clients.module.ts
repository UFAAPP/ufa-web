import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { AvatarModule } from 'ngx-avatar';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { ClientNewComponent } from './components/client-new/client-new.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { PipesModule } from 'src/app/pipes/pipesModule.module';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ClientsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    AvatarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),
    MatTabsModule,
    MatExpansionModule,
    PipesModule
  ],
  declarations: [ClientsComponent, ClientDetailComponent, ClientNewComponent],
  providers: [AuthGuard],
  exports: [ClientsComponent],
})
export class ClientsModule {}
