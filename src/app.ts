/// <reference path="./types/index.d.ts" />
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import initDatabase from "config/seed";
import "dotenv/config";
import express from "express";
import expressSession from "express-session";
import passport from "passport";
import path from "path";
import webRoutes from "routes/web";
import configPassportLocal from "./middleware/passport.local";

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

// config session
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",

    // forces session save even if unchanged
    resave: false,

    // saves unmodified sessions
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      // clears expired sessions every 1 day
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));

configPassportLocal();

// config global
app.use((req, res, next) => {
  res.locals.user = req.user || null; // pass user object to all views
  return next();
});

// config routes
webRoutes(app);

// seeding data
initDatabase();

// handle 404 not found
app.use((req, res) => {
  res.send("404 not found");
  return;
});

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
  // console.log(`${__dirname}/views`);
});
