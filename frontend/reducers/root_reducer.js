import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import teamsReducer from './teams_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  teams: teamsReducer
})

export default rootReducer
