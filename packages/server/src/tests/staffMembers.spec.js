const request = require("supertest");
const app = require("../app");
const { seedRowCounts } = require("../config/seeders");

describe("/api/staff-members", () => {
  describe("GET /", () => {
    it("should return the list of all staff members", async () => {
      const response = await request(app).get("/api/staff-members/").expect(200);

      expect(response.body.length).toBe(seedRowCounts.staffMembers);
    });
  });
});
