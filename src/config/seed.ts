import { prisma } from "config/client";

const initDatabase = async () => {
  const [countUser, countRole] = await Promise.all([
    prisma.user.count(),
    prisma.role.count(),
  ]);

  if (countUser !== 0 && countRole !== 0) {
    console.log(">>> ALREADY INIT DATA...");

    return;
  }

  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "tvhung@gmail.com",
          password: "tranvanhung2003",
          accountType: "SYSTEM",
        },
        {
          username: "admin@gmail.com",
          password: "tranvanhung2003",
          accountType: "SYSTEM",
        },
      ],
    });
  }

  if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        { name: "ADMIN", description: "Admin thì full quyền" },
        { name: "USER", description: "User thông thường" },
      ],
    });
  }
};

export default initDatabase;
