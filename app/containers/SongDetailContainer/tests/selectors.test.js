import { selectTrackId, selectSingleItune, selectSongDetailContainerDomain } from '../selectors';
import { initialState } from '../reducer';

describe('SongDetailContainer selector tests', () => {
  let mockedState;
  let trackId;
  let singleItune;

  beforeEach(() => {
    trackId = 'abc123';
    singleItune = [
      {
        resultCount: 1,
        results: [{ trackId }]
      }
    ];
    mockedState = {
      songDetailContainer: {
        trackId,
        singleItune
      }
    };
  });

  it('should select the singleItune state', () => {
    const singleItuneSelector = selectSingleItune();
    expect(singleItuneSelector(mockedState)).toEqual(singleItune);
  });

  it('should select the singleItune state', () => {
    const trackIdSelector = selectTrackId();
    expect(trackIdSelector(mockedState)).toEqual(trackId);
  });

  it('should select the global state', () => {
    const globalSelector = selectSongDetailContainerDomain(initialState);
    expect(globalSelector).toEqual(initialState);
  });
});
