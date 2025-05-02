import { Request, Response } from "express";
import {
  ProductSchema,
  TypeProductSchema,
} from "src/validation/product.schema";

const getAdminCreateProductPage = (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
  };

  return res.render("admin/product/create", { errors, oldData });
};

const postAdminCreateProduct = (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TypeProductSchema;

  const validate = ProductSchema.safeParse(req.body);

  if (!validate.success) {
    // error
    const errorZod = validate.error.issues;
    const errors = errorZod.map((item) => `${item.message} (${item.path[0]})`);
    const oldData = {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    };

    return res.render("admin/product/create", { errors, oldData });
  }

  // success
  return res.redirect("/admin/product");
};

export { getAdminCreateProductPage, postAdminCreateProduct };
