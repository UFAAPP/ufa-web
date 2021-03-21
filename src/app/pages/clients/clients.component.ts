import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientNewComponent } from './components/client-new/client-new.component';
import { ClientService } from './shared/clients.service';
import { Client } from './shared/clients-model';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clientList: Client[] = [];
  filteredClient: Client[] = [];
  searchName = '';
  color: ThemePalette = 'primary';
  constructor(public clientService: ClientService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getontacts();
  }
  filter(): void {
    this.filteredClient = this.clientList.filter((client) =>
      client.name.toLowerCase().match(this.searchName.toLocaleLowerCase())
    );
  }
  openNew() {
    const dialogRef = this.dialog.open(ClientNewComponent, {
      width: '400px',
      height: '750px',
    });
    dialogRef.afterClosed().subscribe((result) => this.getontacts());
    dialogRef.backdropClick().subscribe((_) => {
      this.getontacts();
    });
  }

  openDetails(client: Client) {
    const dialogRef = this.dialog.open(ClientDetailComponent, {
      data: {
        ...client,
      },
      width: '60vw',
      height: '75vh',
    });
    dialogRef.afterClosed().subscribe((result) => this.getontacts());
    dialogRef.backdropClick().subscribe((_) => {
      this.getontacts();
    });
  }
  getontacts(): void {
    this.clientService.getClients().subscribe((CONTACTLIST) => {
      this.clientList = CONTACTLIST;
      this.filteredClient = CONTACTLIST;
    });
  }
  onToggle(): void {
    if (this.clientService.isChecked) {
       this.filteredClient = this.clientList;
    } else {
       this.filteredClient = this.clientList.filter(
        (client) => client.active
      );
    }
  }
}
