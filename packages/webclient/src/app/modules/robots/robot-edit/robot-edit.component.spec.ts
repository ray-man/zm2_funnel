import { FormsModule } from "@angular/forms";
import { Spectator, createRoutingFactory, mockProvider } from "@ngneat/spectator";
import { of } from "rxjs";

import { RobotEditComponent } from "./robot-edit.component";
import { RobotService } from "../robot.service";

describe("RobotEditComponent", () => {
  let spectator: Spectator<RobotEditComponent>;
  const createComponent = createRoutingFactory({
    component: RobotEditComponent,
    imports: [FormsModule],
    providers: [
      mockProvider(RobotService, {
        getRobotById: jasmine.createSpy().and.returnValue(
          of({
            id: 1337,
            experts: [],
            features: [],
            brand: { name: "Tester Company" },
          })
        ),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it("should create", () => {
    expect(spectator.query("#robotId")).toHaveValue("1337");
    expect(spectator.query("#robotBrand")).toHaveValue("Tester Company");
  });
});
