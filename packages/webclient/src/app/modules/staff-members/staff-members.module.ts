import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StaffMembersRoutingModule } from "./staff-members-routing.module";
import { StaffMemberListComponent } from "./staff-member-list/staff-member-list.component";

@NgModule({
  declarations: [StaffMemberListComponent],
  imports: [CommonModule, StaffMembersRoutingModule],
})
export class StaffMembersModule {}
