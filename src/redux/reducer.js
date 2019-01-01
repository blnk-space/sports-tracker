import { combineReducers } from 'redux';
import capturesReducer from '../modules/RunnerListTable/reducer';

const rootReducer = combineReducers({
  capturesReducer,
});

export default rootReducer;
