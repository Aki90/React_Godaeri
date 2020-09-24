/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useSelector } from 'react-redux';

import AppLayout from '@/components/common/AppLayout';
import PostCreateForm from '@/components/posts/PostCreateForm';

const create = () => {
  const { token } = useSelector(state => state.user);
  const { createPostDone, createPostError } = useSelector(state => state.posts);

  return (
    <AppLayout>
      <h2>방명록</h2>
      <PostCreateForm
        token={token}
        createPostDone={createPostDone}
        createPostError={createPostError}
      />
    </AppLayout>
  );
};

export default create;
