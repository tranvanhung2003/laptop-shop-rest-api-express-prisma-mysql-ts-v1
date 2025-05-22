import { Request, Response } from "express";
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
  if (messages.length !== 0) {
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

export { getLoginPage, getRegisterPage, postRegister };
