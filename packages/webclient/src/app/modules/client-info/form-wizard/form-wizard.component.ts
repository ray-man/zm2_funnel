import { Component, OnDestroy, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss'],
})
export class FormWizardComponent implements OnInit, OnDestroy {
  private _stepper: Stepper;
  private _onDestroy: Subject<void> = new Subject();
  public interests: any;
  public clientId: any;
  constructor() {}

  ngOnInit(): void {
    this._stepper = new Stepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true,
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  next() {
    this._stepper.next();
  }

  previous() {
    this._stepper.previous();
  }
}
