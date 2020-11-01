import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChallengeRoutingModule } from "./challenge-routing.module";
import { DescriptionComponent } from "./description/description.component";

@NgModule({
  declarations: [DescriptionComponent],
  imports: [CommonModule, ChallengeRoutingModule],
})
export class ChallengeModule {}
