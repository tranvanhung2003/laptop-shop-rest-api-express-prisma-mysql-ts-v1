import { ROLE_NAME } from "config/constant";
import { NextFunction, Request, Response } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    return res.redirect("/");
  } else {
    return next();
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user?.role?.name === ROLE_NAME.ADMIN) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export { isAdmin, isLogin };
