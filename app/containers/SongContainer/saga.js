import { put, call, takeLatest } from 'redux-saga/effects';
import { songContainerTypes, songContainerCreators } from './reducer';
import { getItunes } from '@app/services/ituneApi';

// Individual exports for testing
const { REQUEST_GET_ITUNE_SONGS } = songContainerTypes;
const { successGetItuneSongs } = songContainerCreators;

export function* getItuneSongs(action) {
  const response = yield call(getItunes, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItuneSongs(data));
  }
}

export default function* songContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_SONGS, getItuneSongs);
}
