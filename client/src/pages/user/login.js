/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import AppLayout from '@/components/common/AppLayout';
import LoginForm from '@/components/user/LoginForm';

const login = () => {
  const { token, nickname, loginError } = useSelector(state => state.user);
  return (
    <>
      <Head>
        <title>고대리꼬치 | 로그인</title>
      </Head>
      <AppLayout>
        <h2>로그인</h2>
        <LoginForm token={token} nickname={nickname} loginError={loginError} />
      </AppLayout>
    </>
  );
};

export default login;
