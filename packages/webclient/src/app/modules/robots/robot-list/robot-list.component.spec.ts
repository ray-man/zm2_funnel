import { Spectator, createRoutingFactory, byText, mockProvider } from "@ngneat/spectator";
import { of } from "rxjs";

import { RobotListComponent } from "./robot-list.component";
import { RobotService } from "../robot.service";

describe("RobotListComponent", () => {
  let spectator: Spectator<RobotListComponent>;
  const createComponent = createRoutingFactory({
    component: RobotListComponent,
    providers: [
      mockProvider(RobotService, {
        getRobots: jasmine.createSpy().and.returnValue(
          of([
            {
              id: 1337,
              experts: [],
              features: [],
              type: "warehouse",
              brand: { name: "Tester Company" },
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
    expect(spectator.query(byText("Tester Company"))).toExist();
  });
});
