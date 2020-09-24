import React, { useState } from 'react';
import Link from 'next/link';

import AppLayout from '@/components/common/AppLayout';
import Slider from '@/components/Slider';
import menuImage from '@/utils/menuImage.json';

const Home = () => {
  const [images, setImages] = useState(menuImage);

  return (
    <AppLayout>
      <div className="main">
        <section className="banner">
          <Slider images={images} />
        </section>
        {/* //banner */}
        <section className="story">
          <h2>고대리 이야기</h2>
          <br />
          <Link href="/introduce">
            <a>고대리꼬치를 소개합니다 !</a>
          </Link>
        </section>
        {/* //story */}
        <section className="sns">
          <h2>고대리 SNS</h2>
          <p className="tag">#고대리 #고대리신메뉴 #고대리이벤트</p>
          <span className="sns-link">
            <a
              href="https://www.facebook.com/godaeri623/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="icon facebook">
                <img
                  src="images/icon/facebook.svg"
                  alt="페이스북 링크 아이콘"
                />
              </i>
            </a>
            <a
              href="https://www.instagram.com/godaeri_skewers/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="icon insta">
                <img src="images/icon/insta.svg" alt="인스타 링크 아이콘" />
              </i>
            </a>
          </span>
        </section>
        {/* //sns */}
      </div>
      {/* //.main */}
    </AppLayout>
  );
};

export default Home;
