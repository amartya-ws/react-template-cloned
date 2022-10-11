/**
 * Test songDetail sagas
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { getSingleItune } from '@services/ituneApi';
import songDetailContainerSaga, { getItune } from '../saga';
import { songDetailContainerTypes } from '../reducer';
import { apiResponseGenerator } from '@utils/testUtils';

describe('SongDetail saga tests', () => {
  const generator = songDetailContainerSaga();
  const trackId = 'abc123';

  it('should ensure that the action SUCCESS_GET_SINGLE_ITUNE gets dispatched after api call succeeds', () => {
    let getItuneSongsGenerator = getItune({ trackId });
    const res = getItuneSongsGenerator.next().value;
    expect(res).toEqual(call(getSingleItune, trackId));
    const response = [
      {
        resultCount: 1,
        results: [{ trackId }]
      }
    ];
    expect(getItuneSongsGenerator.next(apiResponseGenerator(true, response)).value).toEqual(
      put({
        type: songDetailContainerTypes.SUCCESS_GET_SINGLE_ITUNE,
        data: response
      })
    );
  });

  it('should start task to watch for REQUEST_GET_SINGLE_ITUNE action', () => {
    let res = generator.next().value;
    expect(res).toEqual(takeLatest(songDetailContainerTypes.REQUEST_GET_SINGLE_ITUNE, getItune));
  });
});
