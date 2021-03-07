import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ContactService } from './shared/contact.service';
import { IContact } from './shared/contacts-model';
import { MatDialog } from '@angular/material/dialog';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { AvatarService } from 'ngx-avatar';

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
    public dialog: MatDialog,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.contactService
      .getContacts()
      .then((CONTACTLIST) => (this.contactList = CONTACTLIST));
  }

  openDetails(contact: IContact) {
    this.dialog.open(ContactDetailComponent, {
      data: {
        ...contact,
      },
      width: '400px',
      height: 'auto',
    });
  }
}
