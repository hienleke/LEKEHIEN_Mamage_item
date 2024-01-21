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

describe("GET /api/comments", () => {
     it("should return  list comments", async () => {
          const res = await request(app).get("/api/comments").set("authorization", `${token}`);
          expect(res.statusCode).toBe(200);
     });
});

describe("POST /api/comment", () => {
     it("should create a comment", async () => {
          const res = await request(app)
               .post("/api/comment")
               .send({
                    comment: "Test comment",
                    userId: "user123",
                    username: "testuser",
                    channelId: "channel123",
               })
               .set("authorization", `${token}`);
          expect(res.statusCode).toBe(200);
          expect(res.body.comment).toBe("Test comment");
          expect(res.body.status).toBe("new");
     });
});

describe("PUT /api/comment/status/:status", () => {
     it("should fail with invalid a status", async () => {
          const newStatus = "invalid";
          const res = await request(app)
               .put(`/api/comment/status/invalid`)
               .send({
                    id: "659ae4c2921c4553baba8ea7",
               })
               .set("authorization", `${token}`);
          expect(res.body.success).toBe(false);
     });
});
