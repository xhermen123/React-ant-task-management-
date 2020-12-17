import { all } from 'redux-saga/effects';
import venueSagas from '../containers/venue/venueSaga';

export default function* rootSaga() {
  yield all([
    venueSagas()
  ]);
}