import { Request, Response } from "express";
import { getProductList } from "services/admin/product.service";
import { getAllUsers } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/show");
};
const getAdminUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();

  return res.render("admin/user/show", { users: users });
};
const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await getProductList();

  return res.render("admin/product/show", {
    products,
  });
};
const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/show");
};

export {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
};
