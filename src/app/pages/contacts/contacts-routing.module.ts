import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  {
    path: 'contatos',
    component: MainLayoutComponent,
    children: [{ path: '', component: ContactsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
