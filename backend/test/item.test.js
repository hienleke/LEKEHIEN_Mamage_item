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

describe("GET /api/item", () => {
     it("should return  list items", async () => {
          const res = await request(app).get("/api/iteam").set("authorization", `${token}`);
          expect(res.statusCode).toBe(200);
     });
});

describe("POST /api/item", () => {
     it("should create a item", async () => {
          const res = await request(app)
               .post("/api/item")
               .send({
                    name: "Example Item",
                    description: "This is an example item description.",
                    price: 19.99,
                    status: "active",
                    categoryId: 3,
               })
               .set("authorization", `${token}`);
          expect(res.statusCode).toBe(200);
          expect(res.body.price).toBe(19.99);
          expect(res.body.status).toBe("active");
     });
});
