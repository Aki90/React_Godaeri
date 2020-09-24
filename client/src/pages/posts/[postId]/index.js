/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetchPost } from '@/api/posts';
import { useSelector } from 'react-redux';

import AppLayout from '@/components/common/AppLayout';
import PostItem from '@/components/posts/PostItem';

const fetcher = async postId => {
  const { data } = await fetchPost(postId);
  let postItem = data.post;
  postItem.nickname = data.post.User.nickname;
  return postItem;
};

const index = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: postItem, error: postItemError } = useSWR(postId, fetcher);
  const { nickname } = useSelector(state => state.user);
  const { deletePostDone, deletePostError } = useSelector(state => state.posts);

  // If Get Post Error
  if (postItemError) {
    alert(postItemError.response.data.message);
    router.push('/user/login');
  }

  return (
    <AppLayout>
      <h2>방명록</h2>
      <PostItem
        postItem={postItem ? postItem : {}}
        nickname={nickname}
        deletePostDone={deletePostDone}
        deletePostError={deletePostError}
      />
    </AppLayout>
  );
};

export default index;
