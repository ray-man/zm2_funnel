import { Component, OnInit } from '@angular/core';
import { RobotService } from '../../robots/robot.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
})
export class FeatureFormComponent implements OnInit {
  public robotFeatures: any;
  public featureForm: FormGroup;
  public ddFeatureSettings: any;

  constructor(
    private _robotService: RobotService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._robotService.getFeatures().subscribe((response) => {
      this.robotFeatures = response;
    });

    this.featureForm = this._formBuilder.group({
      feature: [''],
    });

    this.ddFeatureSettings = {
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
    if (this.featureForm.valid) {
      console.log(this.featureForm.value);
    } else {
      console.error(this.featureForm.errors);
    }
  }
}
