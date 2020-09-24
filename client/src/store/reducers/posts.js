import produce from '@/utils/produce';

export const initialState = {
  createPostDone: false,
  createPostError: null,
  updatePostDone: false,
  updatePostError: null,
  deletePostDone: false,
  deletePostError: null,
};

/* ACTION TYPE */

// POST 생성
export const CREATE_POST = 'posts/CREATE_POST';
export const CREATE_POST_INIT = 'posts/CREATE_POST_INIT';
export const CREATE_POST_SUCCESS = 'posts/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'posts/CREATE_POST_FAILURE';

// POST 수정
export const UPDATE_POST = 'posts/UPDATE_POST';
export const UPDATE_POST_INIT = 'posts/UPDATE_POST_INIT';
export const UPDATE_POST_SUCCESS = 'posts/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'posts/UPDATE_POST_FAILURE';

// POST 삭제
export const DELETE_POST = 'posts/DELETE_POST';
export const DELETE_POST_INIT = 'posts/DELETE_POST_INIT';
export const DELETE_POST_SUCCESS = 'posts/DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'posts/DELETE_POST_FAILURE';

/* ACTION CREATORS */

export const actionCreatePost = postData => ({
  type: CREATE_POST,
  postData,
});
export const actionUpdatePost = postData => ({
  type: UPDATE_POST,
  postData,
});
export const actionDeletePost = postId => ({
  type: DELETE_POST,
  postId,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_POST:
        break;
      case CREATE_POST_INIT:
        draft.createPostDone = false;
        draft.createPostError = null;
        break;
      case CREATE_POST_SUCCESS:
        draft.createPostDone = true;
        break;
      case CREATE_POST_FAILURE:
        draft.createPostError = action.error;
        break;
      case UPDATE_POST:
        break;
      case UPDATE_POST_INIT:
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostDone = true;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostError = action.error;
        break;
      case DELETE_POST:
        break;
      case DELETE_POST_INIT:
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      case DELETE_POST_SUCCESS:
        draft.deletePostDone = true;
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostError = action.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
