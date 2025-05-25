import { ROLE_NAME } from "config/constant";
import { NextFunction, Request, Response } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    res.redirect("/");
  } else {
    next();
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;

  if (user?.role?.name === ROLE_NAME.ADMIN) {
    // res.redirect("/admin");
    next();
  } else {
    res.redirect("/");
  }
};

export { isAdmin, isLogin };
