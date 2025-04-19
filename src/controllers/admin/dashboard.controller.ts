import { Request, Response } from "express";
import { getAllUsers } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/show");
};
const getAdminUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();

  return res.render("admin/user/show", { users: users });
};
const getAdminProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/show");
};
const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/show");
};

export {
  getDashboardPage,
  getAdminUserPage,
  getAdminProductPage,
  getAdminOrderPage,
};
