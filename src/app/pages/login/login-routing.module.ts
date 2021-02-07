import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullPageComponent } from 'src/app/layout/full-page/full-page.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: FullPageComponent,
    children: [
      { path: '', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
