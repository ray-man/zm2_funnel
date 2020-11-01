const request = require("supertest");
const app = require("../app");
const { seedRowCounts } = require("../config/seeders");

describe("/api/robots", () => {
  describe("GET /", () => {
    it("should return the list of all robots", async () => {
      const response = await request(app).get("/api/robots/").expect(200);

      expect(response.body.length).toBe(seedRowCounts.robots);
    });
  });
});
