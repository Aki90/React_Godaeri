/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import Head from 'next/head';

import AppLayout from '@/components/common/AppLayout';

const info = () => {
  useEffect(() => {
    // 카카오맵 관련
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      const mapKey = '479617c5d20a5ea8f0fe8ee20514f575';
      /* global kakao */
      script.onload = () => kakao.maps.load(initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${mapKey}`;
      document.head.appendChild(script);
    }
  }, []);

  const initMap = () => {
    const markers = [
      {
        position: new kakao.maps.LatLng(37.560808, 126.926876),
        text: '고대리꼬치',
      },
    ];
    const staticMapContainer = document.getElementById('staticMap'); // 이미지 지도를 표시할 div
    const staticMapOption = {
      center: new kakao.maps.LatLng(37.560808, 126.926876), // 이미지 지도의 중심좌표
      level: 3, // 이미지 지도의 확대 레벨
      marker: markers, // 이미지 지도에 표시할 마커
    };
    const staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption,
    );
  };

  return (
    <>
      <Head>
        <title>고대리꼬치 | 이용안내</title>
      </Head>
      <AppLayout>
        <div>
          <h2>이용안내</h2>
          <section className="info clearfix">
            <article className="map">
              <div id="staticMap" />
            </article>
            <aside className="address">
              <div className="address-info">
                <h3>고대리꼬치</h3>
                <p>
                  <a
                    target="_blank"
                    href="https://map.kakao.com/?urlX=483858&urlY=1128148&urlLevel=3&itemId=20103822&q=%EA%B3%A0%EB%8C%80%EB%A6%AC%EA%BC%AC%EC%B9%98&srcid=20103822&map_type=TYPE_MAP"
                    rel="noreferrer noopener"
                  >
                    서울 서대문구 연희로 22 1층
                  </a>
                </p>
                <dl>
                  <dt>영업시간</dt>
                  <dd>매일 18:00 ~ 04:00</dd>
                  <dt>전화번호</dt>
                  <dd>02-323-5312</dd>
                </dl>
              </div>
            </aside>
            {/* //address */}
          </section>
          {/* //info */}
        </div>
      </AppLayout>
    </>
  );
};

export default info;
