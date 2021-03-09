import { Component, OnInit } from '@angular/core';
import { DataTotal } from './shared/dashboard.model';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataTotal: DataTotal;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getTotal();
  }
  getTotal(): void {
    this.dashboardService
      .getTotal()
      .subscribe((DATATOTAL) => (this.dataTotal = DATATOTAL));
  }
}
