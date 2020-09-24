import React from 'react';
import Head from 'next/head';

import AppLayout from '@/components/common/AppLayout';
import MenuList from '@/components/MenuList';
import menuImage from '@/utils/menuImage.json';

const menu = () => {
  return (
    <>
      <Head>
        <title>고대리꼬치 | 메뉴</title>
      </Head>
      <AppLayout>
        <h2>메뉴</h2>
        <section className="menu-page">
          <MenuList menus={menuImage} />
        </section>
        {/* //menu-page */}
      </AppLayout>
    </>
  );
};

export default menu;
