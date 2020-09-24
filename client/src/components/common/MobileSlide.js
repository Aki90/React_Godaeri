import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '@/store/reducers/user';
import { CLOSE_MOBILE } from '@/store/reducers/mobile';
import { deleteCookie } from '@/utils/cookies';
const MobileSlide = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user);
  const { slideOn } = useSelector(state => state.mobile);

  // 로그아웃 버튼
  const userLogout = useCallback(
    e => {
      e.preventDefault();
      if (confirm('로그아웃 하시겠습니까?')) {
        deleteCookie('godaeri_auth');
        deleteCookie('user_nick');
        dispatch({
          type: LOGOUT,
        });
        alert('로그아웃 되었습니다.');
        router.push('/');
      }
    },
    [dispatch, router],
  );

  // 모바일 슬라이드 메뉴 닫기
  const handleCloseSlide = useCallback(() => {
    dispatch({
      type: CLOSE_MOBILE,
    });
  }, [dispatch]);

  return (
    <nav
      className={`mobile-slide clearfix ${slideOn ? 'slideOn' : ''}`}
      onClick={handleCloseSlide}
    >
      <ul>
        <li>
          <Link href="/introduce">
            <a>소개</a>
          </Link>
        </li>
        <li>
          <Link href="/menu">
            <a>메뉴</a>
          </Link>
        </li>
        <li>
          <Link href="/posts">
            <a>방명록</a>
          </Link>
        </li>
        <li>
          <Link href="/info">
            <a>이용안내</a>
          </Link>
        </li>

        {/* //nav-left */}
        {token ? (
          <>
            <li>
              <a href="#" onClick={userLogout}>
                로그아웃
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user/login">
                <a>로그인</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MobileSlide;
