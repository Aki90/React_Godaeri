const passport = require('passport');
const localstrategy = require('./localstrategy');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser( async (id, done) => { // 사용자정보 복구
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'nickname'],
      });

      return done(null, user); // req.user, req.isAuthenticated() === true
      
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  localstrategy();
};