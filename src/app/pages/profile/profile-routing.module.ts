import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { ProfileComponent } from './profile.component';
const routes: Routes = [
  {
    path: 'perfil',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: ProfileComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
