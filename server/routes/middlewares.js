const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// 토큰 발급
exports.newToken = user => {
  const payload = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRATION_DATE,
  });
};

// 토큰값 검증
exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    return next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        message: '로그인 시간이 만료되어 재로그인이 필요합니다.', // 토큰 만료
      });
    }

    return res.status(401).json({
      message: '로그인이 필요합니다.',
    });
  }
};

