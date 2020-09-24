/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import { useSelector } from 'react-redux';

import AppLayout from '@/components/common/AppLayout';
import PostsListItem from '@/components/posts/PostsListItem';

const fetcher = async url => {
  const { data } = await axios.get(url);

  return data.posts;
};

const index = props => {
  const initialData = props.data;
  const {
    data: postsItem,
    error: postsItemError,
  } = useSWR('https://aki90.herokuapp.com/posts', fetcher, { initialData });
  const { token } = useSelector(state => state.user);

  // If Get Posts Error
  if (postsItemError) {
    return (
      <>
        <Head>
          <title>고대리꼬치 | 방명록</title>
        </Head>
        <AppLayout>
          <h2>방명록</h2>
          <h3>데이터를 불러오는데 오류가 발생했습니다.</h3>
        </AppLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>고대리꼬치 | 방명록</title>
      </Head>
      <AppLayout>
        <h2>방명록</h2>
        <PostsListItem postsItem={postsItem ? postsItem : []} token={token} />
      </AppLayout>
    </>
  );
};

export async function getServerSideProps() {
  const data = await fetcher('https://aki90.herokuapp.com/posts');
  return { props: { data } };
}

export default index;
