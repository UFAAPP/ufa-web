import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactNewComponent } from './components/contact-new/contact-new.component';
import { ContactService } from './shared/contact.service';
import { Contact } from './shared/contacts-model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contactList: Contact[] = [];
  filteredContact: Contact[] = [];
  searchName = '';
  constructor(
    private contactService: ContactService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getontacts();
  }
  filter(): void {
    this.filteredContact = this.contactList.filter((contact) =>
      contact.name.toLowerCase().match(this.searchName.toLocaleLowerCase())
    );
  }
  openNew() {
    const dialogRef = this.dialog.open(ContactNewComponent, {
      width: '400px',
      height: '750px',
    });
    dialogRef.afterClosed().subscribe((result) => this.getontacts());
    dialogRef.backdropClick().subscribe((_) => {
      this.getontacts();
    });
  }

  openDetails(contact: Contact) {
    const dialogRef = this.dialog.open(ContactDetailComponent, {
      data: {
        ...contact,
      },
      width: '400px',
      height: '750px',
    });
    dialogRef.afterClosed().subscribe((result) => this.getontacts());
    dialogRef.backdropClick().subscribe((_) => {
      this.getontacts();
    });
  }
  getontacts(): void {
    this.contactService
      .getContacts()
      .subscribe((CONTACTLIST) => (this.contactList = CONTACTLIST));
  }
}
