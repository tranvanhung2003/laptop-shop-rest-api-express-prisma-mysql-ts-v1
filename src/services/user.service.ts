import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string
) => {
  const newUser = await prisma.user.create({
    data: {
      name: fullName,
      email: email,
      address: address,
    },
  });

  return newUser;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const handleDeleteUser = async (id: string) => {
  const deletedUser = await prisma.user.delete({ where: { id: +id } });

  return deletedUser;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id: +id } });

  return user;
};

const updateUserById = async (
  id: string,
  fullName: string,
  email: string,
  address: string
) => {
  const updatedUser = await prisma.user.update({
    where: { id: +id },
    data: {
      name: fullName,
      email: email,
      address: address,
    },
  });

  return updatedUser;
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserById,
  updateUserById,
};
