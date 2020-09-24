import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionLogin } from '@/store/reducers/user';
import { useForm } from 'react-hook-form';
import { validateEmail } from '@/utils/validation';

const LoginForm = ({ token, nickname, loginError }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue } = useForm();

  useEffect(() => {
    if (loginError) {
      alert(loginError);
      setValue('userPassword', ''); // 비밀번호 초기화
    }
  }, [loginError, setValue]);

  useEffect(() => {
    // 회원가입 완료
    if (token) {
      alert(`${nickname}님 환영합니다 :)`);
      router.push('/');
    }
  }, [router, token, nickname]);

  const onSubmit = useCallback(
    user => {
      // 유효성검사
      if (user.userEmail == '') {
        alert('이메일을 입력해주세요.');
        return false;
      }
      if (!validateEmail(user.userEmail)) {
        alert('이메일 형식을 맞춰주세요.');
        return false;
      }
      if (user.userPassword == '') {
        alert('비밀번호를 입력해주세요.');
        return false;
      }

      // 유저 확인 및 분기 처리
      const userData = {
        email: user.userEmail,
        password: user.userPassword,
      };
      dispatch(actionLogin(userData));
    },
    [dispatch],
  );

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div className="field-item">
          <label htmlFor="emailForm" className="ir_su">
            이메일
          </label>
          <input
            type="email"
            id="emailForm"
            name="userEmail"
            placeholder="이메일 주소를 입력해주세요"
            required
            ref={register({ required: true, validate: validateEmail })}
          />
          {errors.userEmail && (
            <div className="validation-text">
              <span className="warning">이메일형식을 맞춰주세요!</span>
            </div>
          )}
        </div>
        {/* //field-item */}
        <div className="field-item">
          <label htmlFor="passwordForm" className="ir_su">
            비밀번호
          </label>
          <input
            type="password"
            id="passwordForm"
            name="userPassword"
            placeholder="비밀번호를 입력해주세요"
            required
            ref={register({ required: true })}
          />
        </div>
        {/* //field-item */}
      </fieldset>

      <button type="submit" className="login-button">
        로그인
      </button>

      <Link href="/user/signup">
        <a>
          <button type="button" className="signup-button">
            회원가입
          </button>
        </a>
      </Link>
    </form>
  );
};

LoginForm.propTypes = {
  token: PropTypes.string,
  nickname: PropTypes.string,
  loginError: PropTypes.string,
};

export default LoginForm;
