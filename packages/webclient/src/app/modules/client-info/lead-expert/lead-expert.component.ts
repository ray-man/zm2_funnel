import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './../client.service';

@Component({
  selector: 'app-lead-expert',
  templateUrl: './lead-expert.component.html',
  styleUrls: ['./lead-expert.component.scss'],
})
export class LeadExpertComponent implements OnInit {
  public leadId: any;
  public leadResponse: any = null;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.leadId = params.id;

      this._clientService
        .getLead(this.leadId)
        .subscribe((response) => (this.leadResponse = response));
    });
  }
}
