import express, { Request, Response } from "express";
import { validateFields } from "../utils/utils";
import { checkSchema } from "express-validator";
import { ProductService } from "../services/product";

// Create a new express router.
const productRouter = express.Router();

productRouter
  .route("/")
  // Matches GET requests to /products.
  .get(
    // Validating the request according to the schema.
    checkSchema({
      start: {
        in: "query",
        optional: true,
        isNumeric: true,
      },
      limit: {
        in: "query",
        optional: true,
        isNumeric: true,
      },
      sort: {
        in: "query",
        optional: true,
        isIn: {
          options: [["price"]],
        },
      },
      order: {
        in: "query",
        optional: true,
        isIn: {
          options: [["asc", "desc"]],
        },
      },
    }),
    validateFields,
    async (req: Request, res: Response) => {
      const { sort, start, limit, order } = req.query;
      try {
        const allProducts = await ProductService.getAll({
          sort: sort as "price",
          limit: Number(limit),
          order: order as "asc" | "desc",
          start: Number(start),
        });
        return res.json(allProducts);
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    }
  )
  // Matches POST requests to /products.
  .post(
    // Validating the request according to the schema.
    checkSchema({
      name: {
        in: "body",
        isString: true,
      },
      description: {
        in: "body",
        isString: true,
      },
      sellerId: {
        in: "body",
        isInt: true,
      },
      amount: {
        in: "body",
        isInt: true,
      },
      price: {
        in: "body",
        isInt: true,
      },
      currency: {
        in: "body",
        isIn: {
          options: [["TRY"]],
        },
      },
    }),
    validateFields,
    async (req: Request, res: Response) => {
      const { name, description, sellerId, amount, price, currency } = req.body;
      try {
        const product = await ProductService.add({
          amount,
          currency,
          description,
          name,
          price,
          sellerId,
        });
        return res.json(product);
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    }
  );

productRouter
  .route("/:id")
  // For all request types checking if the id exits and is valid.
  .all(
    checkSchema({
      id: {
        in: "params",
        isInt: true,
      },
    }),
    validateFields
  )
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const product = await ProductService.get({ id: Number(id) });
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .put(
    checkSchema({
      name: {
        in: "body",
        isString: true,
        optional: true,
      },
      description: {
        in: "body",
        isString: true,
        optional: true,
      },
      sellerId: {
        in: "body",
        isInt: true,
        optional: true,
      },
      amount: {
        in: "body",
        isInt: true,
        optional: true,
      },
      price: {
        in: "body",
        isInt: true,
        optional: true,
      },
      currency: {
        in: "body",
        optional: true,
        isIn: {
          options: [["TRY"]],
        },
      },
    }),
    validateFields,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, description, sellerId, amount, price, currency } = req.body;
      try {
        const product = await ProductService.modify({
          id: Number(id),
          name,
          description,
          sellerId: Number(sellerId),
          amount: Number(amount),
          price: Number(price),
          currency,
        });
        res.json(product);
      } catch (e) {
        console.warn(e);
        res.status(500).json({ error: e });
      }
    }
  )
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const product = await ProductService.delete({ id: Number(id) });
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

export default productRouter;
