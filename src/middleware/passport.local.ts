import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, async function (
      req,
      username,
      password,
      cb
    ) {
      // check user exist in database
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        // throw error
        return cb(null, false, { message: "username/password invalid" });
      }

      // compare password
      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        return cb(null, false, { message: "Invalid password" });
      }

      return cb(null, user);
    })
  );

  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configPassportLocal;
