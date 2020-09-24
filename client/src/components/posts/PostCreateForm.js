import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionCreatePost } from '@/store/reducers/posts';
import { useForm } from 'react-hook-form';

const PostCreateForm = ({ token, createPostDone, createPostError }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  // 로그인 확인
  useEffect(() => {
    if (!token) {
      alert('로그인 후 확인하실 수 있습니다.');
      router.push('/user/login');
    }
  }, [router, token]);

  useEffect(() => {
    if (createPostError) {
      alert(createPostError);
      return false;
    }
  }, [createPostError]);

  // POST 생성 완료 시
  useEffect(() => {
    if (createPostDone) {
      alert('입력이 완료되었습니다.');
      router.replace('/posts');
    }
  }, [createPostDone, router]);

  // 뒤로가기
  const handleRouteBack = () => {
    router.back();
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

      // 유저 확인 및 분기 처리
      const postData = {
        title: user.title,
        contents: user.contents,
      };

      return dispatch(actionCreatePost(postData));
    },
    [dispatch],
  );

  return (
    <form
      className="post-createform clearfix"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            작성하기
          </button>
        </li>
      </ul>
      {/* //button-list */}
    </form>
  );
};

PostCreateForm.propTypes = {
  token: PropTypes.string,
  createPostDone: PropTypes.bool.isRequired,
  createPostError: PropTypes.string,
};

export default PostCreateForm;
