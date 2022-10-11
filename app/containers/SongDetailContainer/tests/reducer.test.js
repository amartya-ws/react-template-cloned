import { songDetailContainerReducer, songDetailContainerTypes, initialState } from '../reducer';

describe('SongDetailContainer reducer tests', () => {
  let state;
  const trackId = 'abc123';

  beforeEach(() => {
    state = initialState;
  });
  it('should return the initial state by default', () => {
    expect(songDetailContainerReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state when an action of type REQUEST_GET_SINGLE_ITUNE is dispatched', () => {
    const expectedResult = { ...state, trackId };
    expect(
      songDetailContainerReducer(state, {
        type: songDetailContainerTypes.REQUEST_GET_SINGLE_ITUNE,
        trackId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present when SUCCESS_GET_SINGLE_ITUNE is dispatched', () => {
    const data = { resultCount: 1, result: [{ trackId }] };
    const expectedResult = { ...state, singleItune: data };
    expect(
      songDetailContainerReducer(state, {
        type: songDetailContainerTypes.SUCCESS_GET_SINGLE_ITUNE,
        data
      })
    ).toEqual(expectedResult);
  });
});
