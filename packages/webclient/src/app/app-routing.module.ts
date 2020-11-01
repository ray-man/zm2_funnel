import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "challenge",
    loadChildren: () =>
      import("./modules/challenge/challenge.module").then((m) => m.ChallengeModule),
  },
  {
    path: "robots",
    loadChildren: () => import("./modules/robots/robots.module").then((m) => m.RobotsModule),
  },
  {
    path: "staff-members",
    loadChildren: () =>
      import("./modules/staff-members/staff-members.module").then((m) => m.StaffMembersModule),
  },
  { path: "", redirectTo: "/challenge", pathMatch: "full" },
  { path: "**", redirectTo: "/challenge" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
