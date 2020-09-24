import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_FAILURE_INIT,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_SUCCESS_INIT,
  SIGNUP_FAILURE,
  SIGNUP_FAILURE_INIT,
} from '@/store/reducers/user';
import { loginUser, registerUser } from '@/api/user';

function* userLoginSaga(action) {
  try {
    const result = yield call(loginUser, action.userData);
    yield put({
      type: LOGIN_SUCCESS,
      token: result.data.token,
      nickname: result.data.nickname,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error: error.response.data.message,
    });
    yield put({
      type: LOGIN_FAILURE_INIT,
    });
  }
}

function* userSignupSaga(action) {
  try {
    const result = yield call(registerUser, action.userData);
    yield put({
      type: SIGNUP_SUCCESS,
      nickname: result.data.user.nickname,
    });
    yield put({
      type: SIGNUP_SUCCESS_INIT,
    });
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      error: error.response.data.message,
    });
    yield put({
      type: SIGNUP_FAILURE_INIT,
    });
  }
}

function* watchUserLogin() {
  yield takeLatest(LOGIN, userLoginSaga);
}
function* watchUserSignup() {
  yield takeLatest(SIGNUP, userSignupSaga);
}

export default function* userSaga() {
  yield all([fork(watchUserLogin), fork(watchUserSignup)]);
}
