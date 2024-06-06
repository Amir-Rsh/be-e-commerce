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
      expect(response.status).toBe(404);
      expect(response.body.msg).toBe("there are no such clothes");
    });
    test("200: gets the clothing by the required id", async () => {
      const response = await request(app).get(
        "/clothes/60b8d295f1d2f8c1f0e8c6b1"
      );

      expect(response.status).toBe(200);
      expect(response.body.clothing).toEqual({
        _id: "60b8d295f1d2f8c1f0e8c6b1",
        name: "vegan leather jacket",
        collection: "winter",
        category: "coats",
        price: 29.99,
      });
    });
    test("404: responds with the appropriate error when not found", async () => {
      const response = await request(app).get("/clothes/50");
      expect(response.status).toBe(404);
      expect(response.body.msg).toBe("item not found");
    });
  });
});
