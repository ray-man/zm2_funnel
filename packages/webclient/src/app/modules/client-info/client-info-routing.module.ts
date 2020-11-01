import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientEngagementComponent } from './client-engagement/client-engagement.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';

const routes: Routes = [
  {
    path: '',
    component: FormWizardComponent,
  },
  { path: 'client-engagement', component: ClientEngagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientInfoRoutingModule {}
