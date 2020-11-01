import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffMemberListComponent } from "./staff-member-list/staff-member-list.component";

const routes: Routes = [
  {
    path: "",
    component: StaffMemberListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffMembersRoutingModule {}
