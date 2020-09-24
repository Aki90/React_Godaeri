import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionUpdatePost } from '@/store/reducers/posts';
import { useForm } from 'react-hook-form';

const PostEditForm = ({ postItem, updatePostDone, updatePostError }) => {
  const router = useRouter();
  const { postId } = router.query;
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (updatePostError) {
      alert(updatePostError);
      return false;
    }
  }, [updatePostError]);

  useEffect(() => {
    if (updatePostDone) {
      alert('수정을 완료했습니다.');
      router.push('/posts');
    }
  }, [updatePostDone, router]);

  // 뒤로가기
  const handleRouteBack = () => {
    router.push(`/posts/${postId}`);
  };

  const onSubmit = useCallback(
    user => {
      // 유효성검사
      if (!user.title || !user.contents) {
        alert('제목과 내용을 모두 입력해 주세요.');
        return false;
      }
      if (user.contents.length > 200) {
        alert('내용은 200자 이하까지만 가능합니다.');
        return false;
      }

      // 분기 처리 및 수정
      if (confirm('수정하시겠습니까?')) {
        const postData = {
          title: user.title,
          contents: user.contents,
          postId: postId,
        };
        dispatch(actionUpdatePost(postData));
      }
    },
    [dispatch, postId],
  );

  return (
    <form className="post-editform clearfix" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div className="field-item">
          <label htmlFor="title" className="ir_su">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력해주세요"
            defaultValue={postItem.title}
            ref={register({ required: true })}
          />
        </div>
        {/* //field-item */}
        <div className="field-item">
          <label htmlFor="contents" className="ir_su">
            내용
          </label>
          <textarea
            id="contents"
            name="contents"
            placeholder="내용을 입력해주세요"
            maxLength={200}
            defaultValue={postItem.contents}
            ref={register({
              required: true,
              validate: value => value.length <= 199,
            })}
          />
          {errors.contents && (
            <p className="overLength">
              내용은 1자 이상, 200자 이하까지만 가능합니다.
            </p>
          )}
        </div>
        {/* //field-item */}
      </fieldset>
      <ul className="button-list clearfix">
        <li>
          <button
            type="button"
            className="button-type02 back-button"
            onClick={handleRouteBack}
          >
            뒤로가기
          </button>
        </li>
        <li>
          <button type="submit" className="button-type01">
            수정하기
          </button>
        </li>
      </ul>
      {/* //button-list */}
    </form>
  );
};

PostEditForm.propTypes = {
  postItem: PropTypes.object.isRequired,
  updatePostDone: PropTypes.bool.isRequired,
  updatePostError: PropTypes.string,
};

export default PostEditForm;
