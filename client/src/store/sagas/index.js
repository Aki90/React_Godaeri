import { all, fork } from 'redux-saga/effects';

import postsSaga from '@/store/sagas/posts';
import userSaga from '@/store/sagas/user';

export default function* rootSaga() {
  yield all([fork(postsSaga), fork(userSaga)]);
}
