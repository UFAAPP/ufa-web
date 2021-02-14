import { Component, OnInit } from '@angular/core';
import { ContactService } from './shared/contact.service';
import { IContact } from './shared/contacts-model';
import { MatDialog } from '@angular/material/dialog';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  count = 20;
  contactList: IContact[] = [];
  constructor(
    private contactService: ContactService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contactService
      .getContacts()
      .then((CONTACTLIST) => (this.contactList = CONTACTLIST));
  }
  openDetails(contact: IContact) {
    this.dialog.open(ContactDetailComponent, {
      data: {
        contact,
      },
    });
  }
}
