import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/common/services/authentication/auth.service';
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
  count = 20;
  contactList: Contact[] = [];
  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.authService.refreshToken();
    this.contactService
      .getContacts()
      .subscribe((CONTACTLIST) => (this.contactList = CONTACTLIST));
  }
  openNew() {
    this.dialog.open(ContactNewComponent, {
      width: '400px',
      height: '750px',
    });
  }
  openDetails(contact: Contact) {
    this.dialog.open(ContactDetailComponent, {
      data: {
        ...contact,
      },
      width: '400px',
      height: '750px',
    });
  }
}
