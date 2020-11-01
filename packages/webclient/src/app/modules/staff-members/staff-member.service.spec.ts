import { createHttpFactory, HttpMethod, SpectatorHttp } from "@ngneat/spectator";

import { StaffMemberService } from "./staff-member.service";

describe("StaffMemberService", () => {
  let spectator: SpectatorHttp<StaffMemberService>;
  const createHttp = createHttpFactory(StaffMemberService);

  beforeEach(() => (spectator = createHttp()));

  it("should make a request to staff members api", () => {
    spectator.service.getStaffMembers().subscribe();
    spectator.expectOne("/api/staff-members", HttpMethod.GET);
  });
});
