import { selectArtistName, selectItuneData } from '../selectors';

describe('SongContainer selector tests', () => {
  let mockedState;
  let artistName;
  let ituneData;

  beforeEach(() => {
    artistName = 'eminem';
    ituneData = [
      {
        resultCount: 50,
        results: [{ artistName }]
      }
    ];
    mockedState = {
      songContainer: {
        artistName,
        ituneData
      }
    };
  });

  it('should select the artistName state', () => {
    const ituneSelector = selectArtistName();
    expect(ituneSelector(mockedState)).toEqual(artistName);
  });

  it('should select the ituneData state', () => {
    const ituneDataSelector = selectItuneData();
    expect(ituneDataSelector(mockedState)).toEqual(ituneData);
  });
});
