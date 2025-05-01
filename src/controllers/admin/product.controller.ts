import { Request, Response } from "express";

const getAdminCreateProductPage = (req: Request, res: Response) => {
  return res.render("admin/product/create");
};

const postAdminCreateProduct = (req: Request, res: Response) => {
  return res.redirect("/admin/product");
};

export { getAdminCreateProductPage, postAdminCreateProduct };
