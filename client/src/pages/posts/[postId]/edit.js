/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetchPost } from '@/api/posts';
import { useSelector } from 'react-redux';

const fetcher = async postId => {
  const { data } = await fetchPost(postId);
  let postItem = {};
  postItem.title = data.post.title;
  postItem.contents = data.post.contents;
  return postItem;
};

import AppLayout from '@/components/common/AppLayout';
import PostEditForm from '@/components/posts/PostEditForm';

const edit = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: postItem, error: postItemError } = useSWR(postId, fetcher);
  const { updatePostDone, updatePostError } = useSelector(state => state.posts);

  // If Get Posts Error
  if (postItemError) {
    return (
      <AppLayout>
        <h2>방명록</h2>
        <h3>데이터를 불러오는데 오류가 발생했습니다.</h3>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h2>방명록</h2>
      <PostEditForm
        postItem={postItem ? postItem : []}
        updatePostDone={updatePostDone}
        updatePostError={updatePostError}
      />
    </AppLayout>
  );
};

export default edit;
