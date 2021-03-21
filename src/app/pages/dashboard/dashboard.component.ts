import { Component, OnInit } from '@angular/core';
import { DataTotal } from './shared/dashboard.model';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataTotal: DataTotal = {
    count_client: 0,
    count_locker: 0,
    count_lawsuit: 0,
  };
  constructor(private dashboardService: DashboardService) {
    this.getTotal();
  }

  ngOnInit(): void {}
  getTotal(): void {
    this.dashboardService
      .getTotal()
      .subscribe((DATATOTAL) => (this.dataTotal = DATATOTAL));
  }
}
