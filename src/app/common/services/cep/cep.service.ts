import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IAddress, IState } from './cep.model';
import { STATES } from './mock-cep';


@Injectable({
    providedIn: 'root',
})

export class CepService {

    private BRASILAPI: string;

    constructor(
        private httpClient: HttpClient,
    ) {
        this.BRASILAPI = environment.APIs.BRASILAPI;
    }

    isCepValid(cep: string): boolean {
        cep = cep.replace(/\D/g, '');
        if (cep !== '') {
            const regexzipCode = /^[0-9]{8}$/;
            if (regexzipCode.test(cep)) {
                return true;
            }
        }
        return false;
    }

    getStates(): Promise<IState[]> {
        return Promise.resolve(STATES);
    }

    getAddress(cep: string): Observable<IAddress> {
        return this.httpClient.get<IAddress>(`${this.BRASILAPI}/${cep}`).pipe(take(1));
    }

}
