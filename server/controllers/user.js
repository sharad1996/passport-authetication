import passport from 'passport';
import utils from '../jwt';

//post signup data
export const signup = (req, res) => {
  passport.authenticate('signup',function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json({
        status: false,
        message: info.message
      });
    }
    return res.json({
      status: true,
      message: info.message
    });
    })(req, res);
};

//post login data
export const login = (req, res) => {
  passport.authenticate('login',function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json({
        status: false,
        message: info.message
      });
    }
    const token = utils.generateToken(user);
    return res.json({
      status: true,
      token: token,
      message: info.message
    });

  })(req,res);
};
