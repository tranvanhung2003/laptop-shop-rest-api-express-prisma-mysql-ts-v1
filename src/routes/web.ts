import express, { Express } from "express";

const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", (req, res) => {
    res.render("home.ejs");
  });

  router.get("/tvhung", (req, res) => {
    res.send("Hello tran van hung web");
  });

  router.get("/abc", (req, res) => {
    res.send("Hello abc");
  });

  app.use("/", router);
};

export default webRoutes;
