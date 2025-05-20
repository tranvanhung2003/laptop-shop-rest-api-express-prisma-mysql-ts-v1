import initDatabase from "config/seed";
import "dotenv/config";
import express from "express";
import path from "path";
import webRoutes from "routes/web";

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine (template engine)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // app.set("views", `${__dirname}/views`);

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static files: images/css/js
app.use(express.static("public"));

// config routes
webRoutes(app);

// seeding data
initDatabase();

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
  // console.log(`${__dirname}/views`);
});
