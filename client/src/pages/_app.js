import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { LOAD_USER } from '@/store/reducers/user';

// SCSS
import '@/assets/scss/App.scss';
import '@/assets/scss/pages/index.scss';
import '@/assets/scss/pages/introduce.scss';
import '@/assets/scss/pages/info.scss';
import '@/assets/scss/components/common/AppHeader.scss';
import '@/assets/scss/components/common/AppFooter.scss';
import '@/assets/scss/components/Slider.scss';
import '@/assets/scss/components/MenuList.scss';
import '@/assets/scss/components/posts/PostCreateForm.scss';
import '@/assets/scss/components/posts/PostEditForm.scss';
import '@/assets/scss/components/posts/PostItem.scss';
import '@/assets/scss/components/posts/PostsListItem.scss';
import '@/assets/scss/components/user/LoginForm.scss';
import '@/assets/scss/components/user/SignupForm.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyApp = ({ Component }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER,
    });
  }, [dispatch]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"
        />
        <meta name="author" content="sehunJeong" />
        <meta name="description" content="창천동 혼술맛집, 고대리꼬치" />
        <meta name="keywords" content="창천동, 혼술맛집, 고대리꼬치" />
        <title>고대리꼬치</title>
      </Head>
      <Component />
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(MyApp);
