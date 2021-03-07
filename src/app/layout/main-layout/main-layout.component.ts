import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { slideInOutAnimation } from 'src/app/common/animations/animations';
import { AuthService } from 'src/app/common/services/authentication/auth.service';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { ISideBar } from './shared/main-layout-model';
import { MainLayoutService } from './shared/main-layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [slideInOutAnimation],
})
export class MainLayoutComponent {
  path = '';
  menuList: ISideBar[] = [];
  isOpned = true;
  companyName = '';
  @ViewChild('drawer') sidenav!: MatSidenav;
  constructor(
    private mainLayoutService: MainLayoutService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.path = this.router.url;
    this.companyName = `${this.storageService.currentUser.user.first_name} ${this.storageService.currentUser.user.last_name}`;
    this.mainLayoutService
      .getMenuList()
      .then((MENULIST) => (this.menuList = MENULIST));
  }
  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
  prepareRoute(outlet: RouterOutlet): RouterOutlet {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
  openSideBar(): void {
    this.sidenav.toggle();
  }
  logout(): void {
    this.authService.logout();
  }
}
