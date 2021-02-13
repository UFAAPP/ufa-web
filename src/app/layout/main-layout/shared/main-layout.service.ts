import { ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MENULIST } from './mock-main-layout';
import { ISideBar } from './main-layout-model';

@Injectable({
  providedIn: 'root',
})
export class MainLayoutService {
  constructor() {}

  getMenuList(): Promise<ISideBar[]> {
    return Promise.resolve(MENULIST);
  }
}
