import { instancePosts } from '@/api';

// 특정 POST 조회
export function fetchPost(postId) {
  return instancePosts.get(`/${postId}`);
}

// POST 생성
export function createPost(postData) {
  return instancePosts.post('/', postData);
}

// POST 삭제
export function deletePost(postId) {
  return instancePosts.delete(`/${postId}`);
}

// POST 수정
export function editPost(postData) {
  return instancePosts.put(`/${postData.postId}`, {
    title: postData.title,
    contents: postData.contents,
  });
}
