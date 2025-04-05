import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello World nodemon");
});

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
});
