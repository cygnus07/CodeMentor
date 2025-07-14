import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { config } from './environment';
import { User } from '@/models/user.model';
import { TokenPayload } from '@/utils/jwt';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload: TokenPayload, done) => {
    try {
      const user = await User.findById(payload.userId).select('-password');
      
      if (user && user.isActive) {
        return done(null, user);
      }
      
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;