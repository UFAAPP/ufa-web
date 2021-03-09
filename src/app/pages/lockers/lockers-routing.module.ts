import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { LockersComponent } from './lockers.component';


const routes: Routes = [
  {
    path: 'gavetas',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [{ path: '', component: LockersComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LockersRoutingModule {}
