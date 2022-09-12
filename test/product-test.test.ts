import { MockContext, Context, createMockContext } from "./context";
import { ProductService } from "../src/services/product";
import { PrismaClient, Product } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

jest.mock("@prisma/client", () => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
});
test("Should return all users", async () => {
  const mockProducts: Product[] = [];
  mockCtx.prisma.product.findMany.mockResolvedValue(mockProducts);
  const products = await ProductService.getAll({});

  await expect(products.length).toBe(0);
});
