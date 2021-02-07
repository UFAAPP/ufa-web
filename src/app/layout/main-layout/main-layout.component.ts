import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInOutAnimation } from 'src/app/common/animations/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [slideInOutAnimation]
})
export class MainLayoutComponent {
  prepareRoute(outlet: RouterOutlet): RouterOutlet {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
