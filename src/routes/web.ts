import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
} from "controllers/user.controller";
import {
  getDashboardPage,
  getAdminUserPage,
  getAdminProductPage,
  getAdminOrderPage,
} from "controllers/admin/dashboard.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  router.post("/handle-update-user", postUpdateUser);

  // admin routes
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post("/admin/handle-create-user", postCreateUser);
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/order", getAdminOrderPage);

  app.use("/", router);
};

export default webRoutes;
