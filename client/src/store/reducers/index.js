import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from '@/store/reducers/user';
import posts from '@/store/reducers/posts';
import mobile from '@/store/reducers/mobile';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        posts,
        mobile,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
