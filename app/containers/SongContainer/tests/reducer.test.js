import { songContainerReducer, initialState, songContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('songContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(songContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_ITUNE_SONGS is dispatched', () => {
    const artistName = 'eminem';
    const expectedResult = { ...state, artistName };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.REQUEST_GET_ITUNE_SONGS,
        artistName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present when SUCCESS_GET_ITUNE_SONGS is dispatched', () => {
    const data = { resultCount: 50, result: [{ artistName: 'eminem' }] };
    const expectedResult = { ...state, ituneData: data };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.SUCCESS_GET_ITUNE_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_ITUNE_SONGS is dispatched', () => {
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.CLEAR_ITUNE_SONGS
      })
    ).toEqual(initialState);
  });
});
