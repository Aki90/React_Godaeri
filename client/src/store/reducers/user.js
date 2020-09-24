import produce from '@/utils/produce';
import {
  saveAuthToCookie,
  saveUserNickToCookie,
  getAuthFromCookie,
  getUserNickFromCookie,
} from '@/utils/cookies';

export const initialState = {
  token: '',
  nickname: '',
  loginError: null,
  signupError: null,
};

/* ACTION TYPE */

// 로그인
export const LOGIN = 'user/LOGIN';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const LOGIN_FAILURE_INIT = 'user/LOGIN_FAILURE_INIT';

// 회원가입
export const SIGNUP = 'user/SIGNUP';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
export const SIGNUP_SUCCESS_INIT = 'user/SIGNUP_SUCCESS_INIT';
export const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';
export const SIGNUP_FAILURE_INIT = 'user/SIGNUP_FAILURE_INIT';

// 로그아웃
export const LOGOUT = 'user/LOGOUT';

// 유저 정보
export const LOAD_USER = 'user/LOAD_USER';

/* ACTION CREATORS */

export const actionLogin = userData => ({
  type: LOGIN,
  userData,
});

export const actionSignup = userData => ({
  type: SIGNUP,
  userData,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        break;
      case LOGIN_SUCCESS:
        draft.token = action.token;
        draft.nickname = action.nickname;
        saveAuthToCookie(action.token);
        saveUserNickToCookie(action.nickname);
        break;
      case LOGIN_FAILURE:
        draft.loginError = action.error;
        break;
      case LOGIN_FAILURE_INIT:
        draft.loginError = null;
        break;
      case SIGNUP:
        break;
      case SIGNUP_SUCCESS:
        draft.nickname = action.nickname;
        break;
      case SIGNUP_SUCCESS_INIT:
        draft.nickname = '';
        break;
      case SIGNUP_FAILURE:
        draft.signupError = action.error;
        break;
      case SIGNUP_FAILURE_INIT:
        draft.signupError = null;
        break;
      case LOGOUT:
        draft.token = '';
        draft.nickname = '';
        break;
      case LOAD_USER:
        draft.token = getAuthFromCookie();
        draft.nickname = getUserNickFromCookie();
        break;
      default:
        return state;
    }
  });

export default reducer;
