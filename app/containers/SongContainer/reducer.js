/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: songContainerTypes, Creators: songContainerCreators } = createActions({
  requestGetItuneSongs: ['artistName'],
  successGetItuneSongs: ['data'],
  clearItuneSongs: {}
});
export const initialState = { artistName: null, ituneData: {} };

/* eslint-disable default-case, no-param-reassign */
export const songContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case songContainerTypes.REQUEST_GET_ITUNE_SONGS:
        draft.artistName = action.artistName;
        break;
      case songContainerTypes.SUCCESS_GET_ITUNE_SONGS:
        draft.ituneData = action.data;
        break;
      case songContainerTypes.CLEAR_ITUNE_SONGS:
        draft.artistName = null;
        draft.ituneData = {};
        break;
    }
  });

export default songContainerReducer;
