import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientEngagementComponent } from './client-engagement/client-engagement.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { LeadExpertComponent } from './lead-expert/lead-expert.component';

const routes: Routes = [
  {
    path: '',
    component: FormWizardComponent,
  },
  { path: 'lead/:id', component: LeadExpertComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientInfoRoutingModule {}
