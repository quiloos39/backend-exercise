import { Prisma, Product, PrismaClient } from "@prisma/client";
import { isInStock } from "../utils/utils";

const prisma = new PrismaClient();

type GetAllProducts = {
  sort?: "price";
  start?: number;
  limit?: number;
  order?: "asc" | "desc";
};

type AddProduct = {
  name: string;
  description: string;
  sellerId: number;
  amount: number;
  price: number;
  currency: "TRY";
};

type GetProduct = {
  id: number;
};

type ModifyProduct = {
  id: number;
  name: string;
  description: string;
  sellerId: number;
  amount: number;
  price: number;
  currency: "TRY";
};

type DeleteProduct = {
  id: number;
};

/**
 * Responsible for handling Product related operations
 */
export class ProductService {
  /**
   * Returns all products
   * @param options Options for sorting and pagination
   * @returns List of products
   */
  static async getAll({ sort, start, limit, order }: GetAllProducts) {
    // Stores matched query parameters
    let match: Prisma.ProductFindManyArgs = {};

    // Depending on existence of query parameters match gets extended.
    if (start) {
      match = {
        ...match,
        skip: start,
      };
    }
    if (limit) {
      match = {
        ...match,
        take: limit,
      };
    }
    if (sort) {
      match = {
        ...match,
        orderBy: {
          ...match.orderBy,
          price: order || "desc",
        },
      };
    }

    let allProducts: Product[] = [];
    allProducts = await prisma.product.findMany(match);
    // Adds additional field of inStock
    allProducts = allProducts.map(isInStock);
    return allProducts;
  }

  /**
   * Adds a new product
   * @param body Product body
   * @returns Added product
   */
  static async add({
    name,
    description,
    sellerId,
    amount,
    price,
    currency,
  }: AddProduct) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        sellerId,
        amount,
        price,
        currency,
      },
    });
    return product;
  }

  /**
   * Returns a product with given id
   * @param query Product id
   * @returns Product
   */
  static async get({ id }: GetProduct) {
    let product: Product | null = null;
    product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (product) {
      product = isInStock(product);
    }
    return product;
  }

  /**
   * Modifies a product with given id
   * @param query Product id
   * @returns Modified product
   */
  static async modify({
    id,
    name,
    description,
    sellerId,
    amount,
    price,
    currency,
  }: ModifyProduct) {
    // Stores matched query parameters
    let match = {};

    // Depending on existence of query parameters match gets extended.
    if (name) {
      match = {
        ...match,
        name,
      };
    }
    if (description) {
      match = {
        ...match,
        description,
      };
    }
    if (sellerId) {
      match = {
        ...match,
        sellerId,
      };
    }
    if (amount) {
      match = {
        ...match,
        amount,
      };
    }
    if (price) {
      match = {
        ...match,
        price,
      };
    }
    if (currency) {
      match = {
        ...match,
        currency,
      };
    }
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: match,
    });
    return product;
  }

  /**
   * Deletes a product with given id
   * @param query Product id
   * @returns Deleted product
   */
  static async delete({ id }: DeleteProduct) {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return product;
  }
}
