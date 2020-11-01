import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RobotService } from '../../robots/robot.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-interest-form',
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.scss'],
})
export class InterestFormComponent implements OnInit {
  public robotTypes: any;
  public interestForm: FormGroup;
  public ddTypesSettings: any;
  public ddBrandSettings: any;
  public robotBrands: any;

  @Output()
  moveNext: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _robotService: RobotService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._robotService.getTypes().subscribe(
      (response) => {
        this.robotTypes = response;
        this.robotTypes = this.robotTypes.map((item) => item.toUpperCase());
      },
      (error) => {
        console.error(error);
      }
    );

    this._robotService
      .getBrands()
      .subscribe((response) => (this.robotBrands = response));

    this.interestForm = this._formBuilder.group({
      brand: [''],
      robotType: [''],
      autonomy: [''],
      weight: [''],
      minRange: [''],
      maxRange: [''],
      client: [''],
    });

    this.ddTypesSettings = {
      singleSelection: false,
      idField: 'item',
      textField: 'item',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.ddBrandSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  submit() {
    if (this.interestForm.valid) {
      const data = this.interestForm.value;
      this.moveNext.emit(data);
    }
  }
}
