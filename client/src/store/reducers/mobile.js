import produce from '@/utils/produce';

export const initialState = {
  hamOn: false,
  slideOn: false,
};

/* ACTION TYPE */

export const OPEN_MOBILE = 'mobile/OPEN_MOBILE';
export const CLOSE_MOBILE = 'mobile/CLOSE_MOBILE';

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_MOBILE:
        draft.hamOn = true;
        draft.slideOn = true;
        break;
      case CLOSE_MOBILE:
        draft.hamOn = false;
        draft.slideOn = false;
        break;
      default:
        return state;
    }
  });

export default reducer;
