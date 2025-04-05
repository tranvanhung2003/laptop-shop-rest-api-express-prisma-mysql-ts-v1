import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World nodemon");
});

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
  console.log(`env port: ${process.env.POST}`);
});
