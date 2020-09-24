const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');
const { newToken, verifyToken } = require('./middlewares');

const router = express.Router();

// 회원가입
router.post('/', async (req, res) => {
    try {
        // 비밀번호 암호화
        const hash = await bcrypt.hash(req.body.password, 12); 
        
        // 유저 확인 검사
        const exUser = await User.findOne({
            where: {
              email: req.body.email,
            }
        });
        if (exUser) {
            return res.status(403).json({
                message: '가입되어있는 회원입니다.'
            });
        }

        // 닉네임 중복 검사
        const checkNick = await User.findOne({
            where: {
              nickname: req.body.nickname,
            }
        });
        if (checkNick) {
            return res.status(403).json({
                message: '중복되는 닉네임입니다.'
            });
        }

        // 회원가입 완료
        const newUser = await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hash,
        });

        return res.status(201).json({ nickname: newUser.nickname });

    } catch (error) {
        return res.status(500).json({ message: 'Server Signup Error', error });
    }
});

// 로그인 
router.post('/login', (req, res, next) => {
    // 이메일, 비밀번호 입력 검사
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ msg: '이메일을 입력해주세요.' });
    }
    else if (!password) {
        return res.status(400).json({ msg: '비밀번호를 입력해주세요.' });
    }

    try {
        passport.authenticate('local', (err, user, info) => {
            // 에러 발생 시
            if (err) { 
                console.error(err);
                return next(err);
            }
            // 실패할 시
            if (info) { 
                return res.status(401).json(info.reason);
            }

            // jwt.sign
            const token = newToken(user);

            // 토큰 및 유저정보 전송
            return res.status(200).json({
                nickname: user.nickname,
                token: token,
            });
        })(req, res, next);

    } catch (error) {
        console.error(error);
    }
});


module.exports = router;