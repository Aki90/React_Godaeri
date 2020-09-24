import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/common/AppLayout';

const introduce = () => {
  return (
    <>
      <Head>
        <title>고대리꼬치 | 소개</title>
      </Head>
      <AppLayout>
        <section className="introduce">
          <h2>혼밥? 대세는 혼술!</h2>
          <figure className="introduce-image">
            <img
              className="store-image"
              src="/images/store/introduce.jpeg"
              alt="고대리꼬치 매장 이미지"
            />
          </figure>
          {/* //introduce-image */}
          <article className="introduce-text">
            <p>고대리 꼬치에서는 전국에서 유일하게</p>
            <p>&apos;된장소스&apos;를 사용하여 수제꼬치를 만들고 있습니다.</p>
            <p>일상에 지쳐 있을때</p>
            <p>편안하고 아늑한 공간에서</p>
            <p>맛있는 수제꼬치와</p>
            <p>술한잔의 여유를 -</p>
          </article>
          {/* //introduce-text */}
        </section>
      </AppLayout>
    </>
  );
};

export default introduce;
