import { prisma } from "config/client";

const initDatabase = async () => {
  const countUser = await prisma.user.count();

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
  } else {
    console.log(">>> ALREADY INIT DATA...");
  }
};

export default initDatabase;
