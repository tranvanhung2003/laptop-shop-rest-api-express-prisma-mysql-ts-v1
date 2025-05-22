import { Request, Response } from "express";
import { getProducts } from "services/client/item.service";
import {
  getAllRoles,
  getUserById,
  handleCreateUser,
  handleDeleteUser,
  updateUserById,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const products = await getProducts();

  return res.render("client/home/show", {
    products,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();

  return res.render("admin/user/create", { roles });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? null;

  await handleCreateUser(fullName, username, address, phone, avatar, role);

  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handleDeleteUser(id);

  return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // get user by id
  const user = await getUserById(id);
  const roles = await getAllRoles();

  return res.render("admin/user/detail", { id, user, roles });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, username, phone, role, address } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? undefined;

  await updateUserById(id, username, phone, role, address, avatar);

  return res.redirect("/admin/user");
};

export {
  getCreateUserPage,
  getHomePage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
};
