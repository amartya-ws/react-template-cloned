/**
 * Test songContainer sagas
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import songContainerSaga, { getItuneSongs } from '../saga';
import { songContainerTypes } from '../reducer';
import { getItunes } from '@services/ituneApi';
import { apiResponseGenerator } from '@utils/testUtils';

describe('SongContainer saga tests', () => {
  const generator = songContainerSaga();
  const artistName = 'eminem';

  it('should ensure that the action SUCCESS_GET_ITUNE_SONGS gets dispatched after api call succeeds', () => {
    let getItuneSongsGenerator = getItuneSongs({ artistName });
    const res = getItuneSongsGenerator.next().value;
    expect(res).toEqual(call(getItunes, artistName));
    const response = [
      {
        resultCount: 50,
        results: [{ artistName }]
      }
    ];
    expect(getItuneSongsGenerator.next(apiResponseGenerator(true, response)).value).toEqual(
      put({
        type: songContainerTypes.SUCCESS_GET_ITUNE_SONGS,
        data: response
      })
    );
  });

  it('should start task to watch for REQUEST_GET_ITUNE_SONGS action', () => {
    let res = generator.next().value;
    expect(res).toEqual(takeLatest(songContainerTypes.REQUEST_GET_ITUNE_SONGS, getItuneSongs));
  });
});
