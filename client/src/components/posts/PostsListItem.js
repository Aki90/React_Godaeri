import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('ko');

const PostsListItem = ({ postsItem, token }) => {
  const router = useRouter();

  const handleRouteCreate = () => {
    if (!token) {
      alert('로그인 후 확인하실 수 있습니다.');
      router.push('/user/login');
    } else {
      return router.push('/posts/create');
    }
  };

  return (
    <div className="posts-list clearfix">
      <table>
        <thead>
          <tr>
            <th className="number">번호</th>
            <th className="title">제목</th>
            <th className="writer">작성자</th>
            <th className="date">작성일</th>
          </tr>
        </thead>
        <tbody>
          {postsItem.map(postItem => {
            return (
              <tr key={postItem.id}>
                <td className="number">{postItem.id}</td>
                <td className="title">
                  <Link href="/posts/[postId]" as={`/posts/${postItem.id}`}>
                    <a>{postItem.title}</a>
                  </Link>
                </td>
                <td className="writer">{postItem.User.nickname}</td>
                <td className="date">
                  {moment(postItem.createdAt).format('YYYY.MM.DD')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        type="button"
        className="button-type01 write-button"
        onClick={handleRouteCreate}
      >
        글쓰기
      </button>
    </div>
  );
};

PostsListItem.propTypes = {
  postsItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string,
};

export default PostsListItem;
