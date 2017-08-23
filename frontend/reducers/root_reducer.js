import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import teamsReducer from './teams_reducer';
import uiReducer from './ui_reducer';
import projectsReducer from './projects_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  teams: teamsReducer,
  ui: uiReducer,
  projects: projectsReducer
})

export default rootReducer
