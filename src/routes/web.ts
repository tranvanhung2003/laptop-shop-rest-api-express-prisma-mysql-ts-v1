import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from "controllers/admin/dashboard.controller";
import {
  getAdminCreateProductPage,
  getViewProduct,
  postAdminCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import {
  getLoginPage,
  getRegisterPage,
  getSuccessRedirectPage,
  postLogout,
  postRegister,
} from "controllers/client/auth.controller";
import { getProductPage } from "controllers/client/product.controller";
import {
  getCreateUserPage,
  getHomePage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controllers/user.controller";
import express, { Express } from "express";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
import fileUploadMiddleware from "src/middleware/multer";

const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/success-redirect", getSuccessRedirectPage);
  router.get("/product/:id", getProductPage);
  router.get("/login", isLogin, getLoginPage);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  router.post("/logout", postLogout);
  router.get("/register", getRegisterPage);
  router.post("/register", postRegister);

  // admin routes
  router.get("/admin", isAdmin, getDashboardPage);
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser
  );
  router.post("/admin/delete-user/:id", postDeleteUser);
  router.get("/admin/view-user/:id", getViewUser);
  router.post(
    "/admin/update-user",
    fileUploadMiddleware("avatar"),
    postUpdateUser
  );

  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/create-product", getAdminCreateProductPage);
  router.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    postAdminCreateProduct
  );
  router.post("/admin/delete-product/:id", postDeleteProduct);
  router.get("/admin/view-product/:id", getViewProduct);
  router.post(
    "/admin/update-product",
    fileUploadMiddleware("image", "images/product"),
    postUpdateProduct
  );

  router.get("/admin/order", getAdminOrderPage);

  app.use("/", router);
};

export default webRoutes;
