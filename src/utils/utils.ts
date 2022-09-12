import { Product } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

type InStock = {
  inStock: boolean;
};

type WithInStock<T> = T & InStock;

export function isInStock(product: Product): WithInStock<Product> {
  return {
    ...product,
    inStock: product.amount > 0,
  };
}

export function handleError(e: unknown) {
  if (e instanceof Error) {
    console.warn(e.message);
  }
}

export function validateFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}
