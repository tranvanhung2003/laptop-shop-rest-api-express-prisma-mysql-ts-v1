// Get the client
import mysql from "mysql2/promise";

const getConnection = async () => {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hungtran2003.",
    database: "laptop_shop",
  });

  return connection;
};

export default getConnection;
