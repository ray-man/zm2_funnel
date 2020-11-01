import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DescriptionComponent } from "./description/description.component";

const routes: Routes = [
  {
    path: "",
    component: DescriptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeRoutingModule {}
