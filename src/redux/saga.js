import {all} from 'redux-saga/effects';
import {startStopChannel} from '../modules/RunnerListTable/saga';

export default function* rootSaga() {
  yield all([
    startStopChannel(),
  ]);
}
