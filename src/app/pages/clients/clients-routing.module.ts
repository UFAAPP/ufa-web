import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/services/authentication/auth-guard';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
  {
    path: 'clients',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [{ path: '', component: ClientsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
