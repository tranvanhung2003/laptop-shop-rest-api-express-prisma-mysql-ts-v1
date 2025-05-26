import { ROLE_NAME } from "config/constant";
import { NextFunction, Request, Response } from "express";
import { registerNewUser } from "services/client/auth.service";
import {
  RegisterSchema,
  TypeRegisterSchema,
} from "src/validation/register.schema";

const getRegisterPage = async (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return res.render("client/auth/register", { errors, oldData });
};

const getLoginPage = async (req: Request, res: Response) => {
  const messages = (req as any)?.session?.messages ?? [];
  if (messages.length) {
    (req as any).session.messages = [];
  }

  return res.render("client/auth/login", { messages });
};

const postRegister = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } =
    req.body as TypeRegisterSchema;

  const validate = await RegisterSchema.safeParseAsync(req.body);

  if (!validate.success) {
    // error
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`
    );

    const oldData = { fullName, email, password, confirmPassword };

    return res.render("client/auth/register", { errors, oldData });
  }

  // success
  await registerNewUser(fullName, email, password);

  return res.redirect("/login");
};

const getSuccessRedirectPage = (req: Request, res: Response) => {
  const user = req.user;

  if (user?.role?.name === ROLE_NAME.ADMIN) {
    return res.redirect("/admin");
  } else {
    return res.redirect("/");
  }
};

const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};

export {
  getLoginPage,
  getRegisterPage,
  getSuccessRedirectPage,
  postLogout,
  postRegister,
};
