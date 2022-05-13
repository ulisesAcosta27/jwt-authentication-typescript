import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from "../models/user";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secreto",
};

export default new Strategy(opts, async (payload, done) => {
  const user = await User.findById(payload.id);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
});
