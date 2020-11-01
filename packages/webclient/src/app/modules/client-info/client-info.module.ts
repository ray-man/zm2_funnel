import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientInfoRoutingModule } from './client-info-routing.module';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { InfoFormComponent } from './info-form/info-form.component';
import { InterestFormComponent } from './interest-form/interest-form.component';
import { FeatureFormComponent } from './feature-form/feature-form.component';
import { ClientEngagementComponent } from './client-engagement/client-engagement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const NG_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  NgMultiSelectDropDownModule,
];

const FORM_COMPONENTS = [
  FormWizardComponent,
  InfoFormComponent,
  InterestFormComponent,
  FeatureFormComponent,
  ClientEngagementComponent,
];

@NgModule({
  declarations: FORM_COMPONENTS,
  imports: [CommonModule, ClientInfoRoutingModule, ...NG_MODULES],
})
export class ClientInfoModule {}
