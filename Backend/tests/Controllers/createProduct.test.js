import { createProduct } from "../products.js";
import { connectProductDB } from "../../Models/products.js";
import { ObjectId } from "mongodb";

jest.mock("../../Models/products.js");

describe("createProduct", () => {
  let req, res, dbInstance;

  beforeEach(() => {
    req = {
      body: {
        name: "Test Product",
        description: "Test Description",
        price: "100",
        originalPrice: "150",
        discount: "50",
        image: "test.jpg",
        category: "Test Category",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    dbInstance = {
      collection: jest.fn().mockReturnThis(),
      insertOne: jest.fn().mockResolvedValue({ insertedId: new ObjectId() }),
    };
    connectProductDB.mockResolvedValue(dbInstance);
  });

  it("should create a new product", async () => {
    await createProduct(req, res);
    expect(dbInstance.collection).toHaveBeenCalledWith("products");
    expect(dbInstance.insertOne).toHaveBeenCalledWith({
      name: "Test Product",
      description: "Test Description",
      price: "100",
      originalPrice: "150",
      discount: "50",
      image: "test.jpg",
      likes: 0,
      hasLiked: false,
      category: "Test Category",
      ratings: [],
      comments: [],
      inWishlist: false,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      name: "Test Product",
      description: "Test Description",
      price: "100",
      originalPrice: "150",
      discount: "50",
      image: "test.jpg",
      likes: 0,
      hasLiked: false,
      category: "Test Category",
      ratings: [],
      comments: [],
      inWishlist: false,
    }));
  });
});