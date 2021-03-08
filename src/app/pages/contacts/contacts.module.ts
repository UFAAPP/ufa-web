import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { AvatarModule } from 'ngx-avatar';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { ContactNewComponent } from './components/contact-new/contact-new.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ContactsRoutingModule,
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
  ],
  declarations: [
    ContactsComponent,
    ContactDetailComponent,
    ContactNewComponent,
  ],
  providers: [AuthGuard],
  exports: [ContactsComponent],
})
export class ContactsModule {}
