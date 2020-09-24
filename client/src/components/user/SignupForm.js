import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionSignup } from '@/store/reducers/user';
import { useForm } from 'react-hook-form';
import { validateEmail } from '@/utils/validation';

const SignupForm = ({ nickname, signupError }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, getValues, setValue } = useForm();

  useEffect(() => {
    if (signupError) {
      alert(signupError);
      setValue('userPassword', ''); // 비밀번호 초기화
      setValue('userPasswordConfirm', '');
    }
  }, [signupError, setValue]);

  useEffect(() => {
    // 가입 완료 시
    if (nickname) {
      alert(`${nickname}님이 가입되었습니다.`);
      router.push('/');
    }
  }, [router, nickname]);

  // 비밀번호 비교확인
  const confirmPassword = useCallback(() => {
    const userPassword = getValues('userPassword');
    const userPasswordConfirm = getValues('userPasswordConfirm');

    return userPassword == userPasswordConfirm;
  }, [getValues]);

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
      if (user.userNickname == '') {
        alert('이메일을 입력해주세요.');
        return false;
      }
      if (user.userPassword == '') {
        alert('비밀번호를 입력해주세요.');
        return false;
      }

      // 유저 확인 및 분기 처리
      const userData = {
        email: user.userEmail,
        nickname: user.userNickname,
        password: user.userPassword,
      };
      dispatch(actionSignup(userData));
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
          <label htmlFor="nicknameForm" className="ir_su">
            닉네임
          </label>
          <input
            type="text"
            id="nicknameForm"
            name="userNickname"
            placeholder="닉네임을 입력해주세요"
            required
            ref={register({ required: true })}
          />
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
        <div className="field-item">
          <label htmlFor="passwordConfirmForm" className="ir_su">
            비밀번호 확인
          </label>
          <input
            type="password"
            id="passwordConfirmForm"
            name="userPasswordConfirm"
            placeholder="비밀번호를 한번 더 입력해주세요"
            required
            ref={register({ required: true, validate: confirmPassword })}
          />
          {errors.userPasswordConfirm && (
            <div className="validation-text">
              <span className="warning">두 비밀번호를 맞춰주세요!</span>
            </div>
          )}
        </div>
        {/* //field-item */}
      </fieldset>
      <button type="submit" className="signup-btn">
        회원가입
      </button>
    </form>
  );
};

SignupForm.propTypes = {
  nickname: PropTypes.string,
  signupError: PropTypes.string,
};

export default SignupForm;
