import { instanceUser } from '@/api';

// 회원정보
export function getUser() {
  return instanceUser.get('/');
}

// 회원가입
export function registerUser(userData) {
  return instanceUser.post('/', userData);
}

// 로그인
export function loginUser(userData) {
  return instanceUser.post('/login', userData);
}
