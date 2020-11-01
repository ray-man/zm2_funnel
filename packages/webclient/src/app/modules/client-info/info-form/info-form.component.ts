import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from './../client.service';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit {
  public infoForm: FormGroup;

  @Output()
  moveNext: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _client: ClientService
  ) {}

  ngOnInit(): void {
    this.infoForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      notes: [''],
    });
  }

  submit() {
    if (this.infoForm.valid) {
      const data = {
        name: this.infoForm.controls.name.value,
        email: this.infoForm.controls.email.value,
        phone: this.infoForm.controls.phone.value,
        address: this.infoForm.controls.address.value,
        notes: this.infoForm.controls.notes.value,
      };
      this._client.create(data).subscribe(
        (response) => {
          if (response.hasOwnProperty('id')) {
            this.moveNext.emit(response['id']);
            this.infoForm.disable();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log(this.findInvalidControls());
    }
  }

  cancel() {
    this.infoForm.reset();
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.infoForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
