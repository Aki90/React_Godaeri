/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import AppLayout from '@/components/common/AppLayout';
import SignupForm from '@/components/user/SignupForm';

const signup = () => {
  const { nickname, signupError } = useSelector(state => state.user);

  return (
    <>
      <Head>
        <title>고대리꼬치 | 회원가입</title>
      </Head>
      <AppLayout>
        <h2>회원가입</h2>
        <SignupForm nickname={nickname} signupError={signupError} />
      </AppLayout>
    </>
  );
};

export default signup;
