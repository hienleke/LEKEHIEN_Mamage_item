const request = require("supertest");
const app = require("../app"); // Update the path accordingly
const config = require("../src/utils/config");

const username = config.api.username;
const password = config.api.password;
let token = "";

beforeAll(async () => {
     const res = await request(app).post("/api/login").send({
          username: username,
          password: password,
     });
     token = res.body.token;
});

describe("GET /api/category", () => {
     it("should return list of categories", async () => {
          const res = await request(app).get("/api/category").set("authorization", `${token}`);
          expect(res.statusCode).toBe(200);
     });
});

describe("POST /api/category", () => {
     it("should create a new category", async () => {
          const res = await request(app)
               .post("/api/category")
               .send({
                    name: "Example Category",
                    description: "This is an example category description.",
                    status: "active",
               })
               .set("authorization", `${token}`);
          expect(res.statusCode).toBe(201); // Updated status code to 201 for category creation
          expect(res.body.status).toBe("active");
     });
});

// Add more tests for other category endpoints (e.g., GET by ID, PUT, DELETE) as needed
