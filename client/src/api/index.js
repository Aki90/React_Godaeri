import axios from 'axios';
import { setInterceptors } from '@/utils/interceptors';
import { API_URL } from '@/config/config';

// axios 초기화
function createInstance(url) {
  const instance = axios.create({
    baseURL: `${API_URL}${url}`,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: true,
  });

  return setInterceptors(instance);
}

export const instanceUser = createInstance('/user');
export const instancePosts = createInstance('/posts');
