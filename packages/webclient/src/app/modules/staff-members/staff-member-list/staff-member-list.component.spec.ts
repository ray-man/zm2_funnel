import { Spectator, createRoutingFactory, byText, mockProvider } from "@ngneat/spectator";
import { of } from "rxjs";

import { StaffMemberListComponent } from "./staff-member-list.component";
import { StaffMemberService } from "../staff-member.service";

describe("StaffMemberListComponent", () => {
  let spectator: Spectator<StaffMemberListComponent>;
  const createComponent = createRoutingFactory({
    component: StaffMemberListComponent,
    providers: [
      mockProvider(StaffMemberService, {
        getStaffMembers: jasmine.createSpy().and.returnValue(
          of([
            {
              id: 1337,
              name: "John Doe",
              robots: [],
            },
          ])
        ),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it("should create", () => {
    expect(spectator.query(byText("John Doe"))).toExist();
  });
});
