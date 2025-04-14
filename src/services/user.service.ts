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
  try {
    const connection = await getConnection();

    const sql = "DELETE FROM `user` WHERE `id` = ? LIMIT 1";
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);

    return result;
  } catch (err) {
    console.log(err);

    return [];
  }
};

const getUserById = async (id: string) => {
  try {
    const connection = await getConnection();

    const sql = "SELECT * FROM `user` WHERE `id` = ?";
    const values = [id];

    const [rows, fields] = await connection.execute(sql, values);

    return rows[0];
  } catch (err) {
    console.log(err);

    return [];
  }
};

const updateUserById = async (
  id: string,
  fullName: string,
  email: string,
  address: string
) => {
  try {
    const connection = await getConnection();

    const sql =
      "UPDATE `user` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ? LIMIT 1";
    const values = [fullName, email, address, id];

    const [result, fields] = await connection.execute(sql, values);

    return result;
  } catch (err) {
    console.log(err);

    return [];
  }
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserById,
  updateUserById,
};
