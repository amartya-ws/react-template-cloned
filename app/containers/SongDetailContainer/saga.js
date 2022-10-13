import { put, call, takeLatest } from 'redux-saga/effects';
import { songDetailContainerTypes, songDetailContainerCreators } from './reducer';
import { getSingleItune } from '@app/services/ituneApi';

// Individual exports for testing
const { REQUEST_GET_SINGLE_ITUNE } = songDetailContainerTypes;
const { successGetSingleItune } = songDetailContainerCreators;

export function* getItune(action) {
  const response = yield call(getSingleItune, action.trackId);
  const { data, ok } = response;
  /* istanbul ignore else */
  if (ok) {
    yield put(successGetSingleItune(data));
  }
}

export default function* songDetailContainerSaga() {
  yield takeLatest(REQUEST_GET_SINGLE_ITUNE, getItune);
}
