import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap/alert";

import { RobotsRoutingModule } from "./robots-routing.module";
import { RobotListComponent } from "./robot-list/robot-list.component";
import { RobotEditComponent } from "./robot-edit/robot-edit.component";

@NgModule({
  declarations: [RobotListComponent, RobotEditComponent],
  imports: [CommonModule, FormsModule, AlertModule, RobotsRoutingModule],
})
export class RobotsModule {}
