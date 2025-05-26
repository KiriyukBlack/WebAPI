import passport from 'koa-passport';
import { BasicStrategy } from 'passport-http';
import * as users from '../models/users';

const verifyPassword = (user: any, password: string) => {
  return user.password === password; // Replace with bcrypt in production
};

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const result = await users.findByUsername(username);
      if (result.length) {
        const user = result[0];
        if (verifyPassword(user, password)) {
          done(null, { user });
        } else {
          console.log(`Password incorrect for ${username}`);
          done(null, false);
        }
      } else {
        console.log(`No user found with username ${username}`);
        done(null, false);
      }
    } catch (error) {
      console.error(`Error during authentication for user ${username}: ${error}`);
      done(null, false);
    }
  })
);

export const basicAuth = async (ctx: any, next: any) => {
  return passport.authenticate('basic', { session: false }, (err, user) => {
    if (err || !user) {
      ctx.status = 401;
      ctx.body = { message: 'You are not authorized' };
    } else {
      ctx.state.user = user;
      ctx.body = { message: 'You are authenticated' };
      return next();
    }
  })(ctx, next);
};