import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AvatarModule } from 'ngx-avatar';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ProfileRoutingModule,
    HttpClientModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(maskConfig),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true,
      easing: 'ease-in-out',
    }),
  ],
  declarations: [ProfileComponent],
  providers: [AuthGuard],
  exports: [ProfileComponent],
})
export class ProfileModule {}
