import { Injectable } from '@angular/core';
import { CONTACTLIST } from './contacts-mock';
import { IContact } from './contacts-model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  getContacts(): Promise<IContact[]> {
    return Promise.resolve(CONTACTLIST);
  }
}
