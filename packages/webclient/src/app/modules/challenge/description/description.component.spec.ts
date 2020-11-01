import { Spectator, createComponentFactory, byText } from "@ngneat/spectator";
import { DescriptionComponent } from "./description.component";

describe("DescriptionComponent", () => {
  let spectator: Spectator<DescriptionComponent>;
  const createComponent = createComponentFactory(DescriptionComponent);

  beforeEach(() => (spectator = createComponent()));

  ["Mission Recon", "Main Challenge", "Bonus Round"].forEach((cardTitle) => {
    it(`should contain the ${cardTitle} card`, () => {
      const element = spectator.query(byText(cardTitle));

      expect(element).toExist();
    });
  });
});
