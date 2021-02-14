import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContact } from '../../shared/contacts-model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public contact: IContact) {}

  ngOnInit(): void {
    console.log(this.contact)
  }
}
