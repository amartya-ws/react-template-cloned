/*
 *
 * SongDetail reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  trackId: null,
  singleItune: {}
};

export const { Types: songDetailContainerTypes, Creators: songDetailContainerCreators } = createActions({
  requestGetSingleItune: ['trackId'],
  successGetSingleItune: ['data']
});

/* eslint-disable default-case, no-param-reassign */
export const songDetailContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case songDetailContainerTypes.REQUEST_GET_SINGLE_ITUNE:
        draft.trackId = action.trackId;
        break;
      case songDetailContainerTypes.SUCCESS_GET_SINGLE_ITUNE:
        draft.singleItune = action.data;
        break;
    }
  });

export default songDetailContainerReducer;
