import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  CREATE_POST,
  CREATE_POST_INIT,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST,
  UPDATE_POST_INIT,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST,
  DELETE_POST_INIT,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '@/store/reducers/posts';
import { createPost, editPost, deletePost } from '@/api/posts';

// POST 생성
function* createPostSaga(action) {
  try {
    const result = yield call(createPost, action.postData);
    if (result) {
      yield put({
        type: CREATE_POST_SUCCESS,
      });
      yield put({
        type: CREATE_POST_INIT,
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_POST_FAILURE,
      error: error.response.data.msg,
    });
    yield put({
      type: CREATE_POST_INIT,
    });
  }
}

// POST 수정
function* updatePostSaga(action) {
  try {
    const result = yield call(editPost, action.postData);
    if (result) {
      yield put({
        type: UPDATE_POST_SUCCESS,
      });
      yield put({
        type: UPDATE_POST_INIT,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_POST_FAILURE,
      error: error.response.data.message,
    });
    yield put({
      type: UPDATE_POST_INIT,
    });
  }
}

// POST 삭제
function* deletePostSaga(action) {
  try {
    const result = yield call(deletePost, action.postId);
    if (result) {
      yield put({
        type: DELETE_POST_SUCCESS,
      });
      yield put({
        type: DELETE_POST_INIT,
      });
    }
  } catch (error) {
    yield put({
      type: DELETE_POST_FAILURE,
      error: error.response.data.message,
    });
    yield put({
      type: DELETE_POST_INIT,
    });
  }
}

function* watchCreatePost() {
  yield takeLatest(CREATE_POST, createPostSaga);
}
function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST, updatePostSaga);
}
function* watchDeletePosts() {
  yield takeLatest(DELETE_POST, deletePostSaga);
}

export default function* postsSaga() {
  yield all([
    fork(watchCreatePost),
    fork(watchUpdatePost),
    fork(watchDeletePosts),
  ]);
}
