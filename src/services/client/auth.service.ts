import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassword } from "services/user.service";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { username: email } });

  if (!user) {
    return false;
  }

  return true;
};

const registerNewUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const newPassword = await hashPassword(password);

  const userRole = await prisma.role.findUnique({ where: { name: "USER" } });

  if (!userRole) {
    throw new Error("User Role không tồn tai");
  }

  await prisma.user.create({
    data: {
      username: email,
      password: newPassword,
      fullName: fullName,
      accountType: ACCOUNT_TYPE.SYSTEM,
      roleId: userRole.id,
    },
  });
};

export { isEmailExist, registerNewUser };
