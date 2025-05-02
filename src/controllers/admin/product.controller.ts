import { Request, Response } from "express";
import {
  ProductSchema,
  TypeProductSchema,
} from "src/validation/product.schema";

const getAdminCreateProductPage = (req: Request, res: Response) => {
  return res.render("admin/product/create");
};

const postAdminCreateProduct = (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const result = ProductSchema.parse(req.body);
  } catch (error) {
    console.log(error);
  }

  return res.redirect("/admin/product");
};

export { getAdminCreateProductPage, postAdminCreateProduct };
