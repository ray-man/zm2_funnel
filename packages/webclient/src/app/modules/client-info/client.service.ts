import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Client } from './client-form.service';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private readonly http: HttpClient) {}

  public create(data: Client) {
    return this.http.post('/api/clients', data);
  }
}
