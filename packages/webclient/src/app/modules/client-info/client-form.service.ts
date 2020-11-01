import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable()
export class ClientFormService {
  updates$: Subject<Partial<Client>> = new Subject<Partial<Client>>();
  errros$: Subject<any> = new Subject();
  apiResponse$: Subject<any> = new Subject();
}
