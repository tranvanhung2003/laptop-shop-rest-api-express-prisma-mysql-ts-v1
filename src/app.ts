import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine (template engine)
app.set("view engine", "ejs");
// app.set("views", `${__dirname}/views`);
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/tvhung", (req, res) => {
  res.send("Hello tran van hung");
});

app.get("/abc", (req, res) => {
  res.send("Hello abc");
});

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
  // console.log(`${__dirname}/views`);
});
