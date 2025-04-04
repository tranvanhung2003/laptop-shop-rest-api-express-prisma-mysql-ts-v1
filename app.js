const express = require("express");

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
});
