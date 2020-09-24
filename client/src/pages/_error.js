import React from 'react';

import AppLayout from '@/components/common/AppLayout';

const errorPage = () => {
  return (
    <AppLayout>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>관리자에게 문의주세요.</p>
    </AppLayout>
  );
};

export default errorPage;
