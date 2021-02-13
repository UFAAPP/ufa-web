import { Component, OnInit } from '@angular/core';
import { ContactService } from './shared/contact.service';
import { IContact } from './shared/contacts-model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  count = 20;
  contactList: IContact[] = [];
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService
      .getContacts()
      .then((CONTACTLIST) => (this.contactList = CONTACTLIST));
  }
}
