import { createHttpFactory, HttpMethod, SpectatorHttp } from "@ngneat/spectator";

import { RobotService } from "./robot.service";

describe("RobotService", () => {
  let spectator: SpectatorHttp<RobotService>;
  const createHttp = createHttpFactory(RobotService);

  beforeEach(() => (spectator = createHttp()));

  it("should make a request to staff members api", () => {
    spectator.service.getRobots().subscribe();
    spectator.expectOne("/api/robots", HttpMethod.GET);
  });
});
