import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '@/store/reducers/user';
import { OPEN_MOBILE, CLOSE_MOBILE } from '@/store/reducers/mobile';
import { deleteCookie } from '@/utils/cookies';

const AppHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user);
  const { hamOn } = useSelector(state => state.mobile);

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

  const handleHamOn = useCallback(() => {
    hamOn
      ? dispatch({
          type: CLOSE_MOBILE,
        })
      : dispatch({
          type: OPEN_MOBILE,
        });
  }, [dispatch, hamOn]);

  return (
    <header id="header">
      <div className="container">
        <div className="row">
          <div className="header clearfix">
            <h1>
              <Link href="/">
                <a>
                  <img
                    className="logo"
                    src="/images/logo.jpeg"
                    alt="고대리꼬치"
                  />
                </a>
              </Link>
            </h1>

            <nav className="nav clearfix">
              <ul className="nav-left clearfix">
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
              </ul>
              {/* //nav-left */}
              <ul className="nav-right clearfix">
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
                    <li>
                      <Link href="/user/signup">
                        <a>회원가입</a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* Mobile Menu */}
            <div id="mobile-nav">
              <h2 className="ir_su">고대리 모바일 메뉴</h2>
              <button type="button" className="ham" onClick={handleHamOn}>
                <span></span>
              </button>
            </div>
            {/* //Mobile Menu */}
          </div>
          {/* //.header */}
        </div>
        {/* //row */}
      </div>
      {/* //container */}
    </header>
  );
};

export default AppHeader;
