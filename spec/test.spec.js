const request = require("supertest");
const app = require("../app");

require("dotenv").config();

describe("POST localhost:60001/test", () => {
  it("should return all products", async () => {
      return request(app)
          .post("/test")
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
              expect(res.statusCode).toBe(200);
          })
  });
});