const passport = require('passport');
const bycrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {

      // 사용자 확인 검사
      const exUser = await User.findOne({ where: { email } });
      if (! exUser) {
        return done(null, false, { 
          reason: { message: '존재하지 않는 사용자입니다.'} });
      }
    
      // 암호 비교
      const result = await bycrypt.compare(password, exUser.password);
      if (result) {
        return done(null, exUser);
      } else {
        return done(null, false, {
          reason: { message: '비밀번호가 다릅니다.'} });
      }

    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
}