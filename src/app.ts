import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`<h1 style="color: red">Hello World nodemon</h1>`);
});

app.get("/tvhung", (req, res) => {
  res.send("Hello tvhung");
});

app.get("/abc", (req, res) => {
  res.send("Hello abc");
});

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
});
