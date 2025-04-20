import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
  const [countUser, countRole] = await Promise.all([
    prisma.user.count(),
    prisma.role.count(),
  ]);

  if (countUser !== 0 && countRole !== 0) {
    console.log(">>> ALREADY INIT DATA...");

    return;
  }

  if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        { name: "ADMIN", description: "Admin thì full quyền" },
        { name: "USER", description: "User thông thường" },
      ],
    });
  }

  if (countUser === 0) {
    const defaultPassword = await hashPassword("123456");
    const adminRole = await prisma.role.findFirst({ where: { name: "ADMIN" } });

    if (adminRole) {
      await prisma.user.createMany({
        data: [
          {
            fullName: "Trần Văn Hưng",
            username: "tvhung@gmail.com",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminRole.id,
          },
          {
            fullName: "Admin",
            username: "admin@gmail.com",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminRole.id,
          },
        ],
      });
    }
  }
};

export default initDatabase;
