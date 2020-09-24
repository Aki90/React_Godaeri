import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionDeletePost } from '@/store/reducers/posts';
import moment from 'moment';

const PostItem = ({ postItem, nickname, deletePostDone, deletePostError }) => {
  const router = useRouter();
  const { postId } = router.query;
  const dispatch = useDispatch();
  const [userCheck, setUserCheck] = useState(false);

  // 작성자 비교 확인
  useEffect(() => {
    if (postItem.nickname == nickname) {
      setUserCheck(true);
    }
  }, [nickname, postItem.nickname, userCheck]);

  useEffect(() => {
    if (deletePostError) {
      alert(deletePostError);
      return false;
    }
  }, [deletePostError]);

  // POST 삭제 완료 시
  useEffect(() => {
    if (deletePostDone) {
      alert('게시물이 삭제되었습니다.');
      router.push('/posts');
    }
  }, [deletePostDone, router]);

  // 수정버튼
  const handleRouteUpdate = () => {
    router.push(`/posts/${postId}/edit`);
  };
  // 삭제버튼
  const handleRouteDelete = () => {
    if (confirm('게시물을 삭제하시겠습니까?')) {
      return dispatch(actionDeletePost(postId));
    }
  };
  // 뒤로가기
  const handleRouteBack = () => {
    router.replace('/posts');
  };

  return (
    <div className="post-item">
      <div className="post-title">
        <h3>{postItem.title}</h3>
        <p>게시물 번호 · {postItem.id}</p>
        <p>
          {postItem.nickname} ·{' '}
          {moment(postItem.createdAt).format('YYYY.MM.DD')}
        </p>
      </div>
      <form className="post-itemform clearfix">
        <fieldset>
          <div className="field-item">
            <label htmlFor="contents" className="ir_su">
              내용
            </label>
            <textarea
              id="contents"
              value={postItem.contents}
              readOnly
            ></textarea>
          </div>
          {/* //field-item */}
        </fieldset>
        <ul className="button-list clearfix">
          {userCheck && (
            <>
              <li>
                <button
                  type="button"
                  className="button-type02 back-button"
                  onClick={handleRouteUpdate}
                >
                  수정하기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="button-type01"
                  onClick={handleRouteDelete}
                >
                  삭제하기
                </button>
              </li>
            </>
          )}
          <li>
            <button
              type="button"
              className="button-type02 back-button"
              onClick={handleRouteBack}
            >
              목록보기
            </button>
          </li>
        </ul>
        {/* //button-list */}
      </form>
      {/* //form */}
    </div>
  );
};

PostItem.propTypes = {
  postItem: PropTypes.object.isRequired,
  nickname: PropTypes.string.isRequired,
  deletePostDone: PropTypes.bool.isRequired,
  deletePostError: PropTypes.string,
};

export default PostItem;
