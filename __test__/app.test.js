const request = require("supertest");
const app = require("../app");
const client = require("../db/connection");
const data = require("../db/testData");
const db = client.db("test");
const clothes = db.collection("clothes");

beforeAll(async () => {
  await clothes.drop();
  await db.createCollection("clothes");
  await clothes.insertMany(data);
});
afterAll(async () => {
  await client.close();
});

describe("Tesing all the endpoints", () => {
  describe("GET /clothes", () => {
    test("200: gets all clothes", async () => {
      const response = await request(app).get("/clothes");

      expect(response.status).toBe(200);
      expect(response.body.clothes.length).toBe(4);
    });
    test("200: gets all clothes with the queried category", async () => {
      const response = await request(app).get("/clothes?category=pants");

      expect(response.status).toBe(200);
      expect(response.body.clothes.length).toBe(1);
    });
    test("200: gets all clothes with the queried collection", async () => {
      const response = await request(app).get("/clothes?collection=winter");

      expect(response.status).toBe(200);
      expect(response.body.clothes.length).toBe(2);
    });
    test("200: gets all clothes with the queried category and collection", async () => {
      const response = await request(app).get(
        "/clothes?category=coats&collection=winter"
      );

      expect(response.status).toBe(200);
      expect(response.body.clothes.length).toBe(1);
    });
    test("404: return the correct error message when no clothes in the category", async () => {
      const response = await request(app).get("/clothes?category=gloves");
      console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body.msg).toBe("there are no such clothes");
    });
  });
});
