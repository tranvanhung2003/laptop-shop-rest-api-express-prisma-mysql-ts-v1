import { Role, User } from "@prisma/client";

interface UserWithRole extends Omit<User, "password"> {
  password?: string;
  role?: Role;
}

declare global {
  namespace Express {
    interface User extends UserWithRole {}
  }
}
