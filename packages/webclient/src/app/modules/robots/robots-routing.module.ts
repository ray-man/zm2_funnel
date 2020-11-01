import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RobotEditComponent } from "./robot-edit/robot-edit.component";
import { RobotListComponent } from "./robot-list/robot-list.component";

const routes: Routes = [
  {
    path: "",
    component: RobotListComponent,
  },
  {
    path: ":id",
    pathMatch: "full",
    component: RobotEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotsRoutingModule {}
