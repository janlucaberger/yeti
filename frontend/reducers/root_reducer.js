import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import teamsReducer from './teams_reducer';
import uiReducer from './ui_reducer';
import projectsReducer from './projects_reducer';
import issuesReducer from './issues_reducer';
import attachmentsReducer from './attachments_reducer';
import issuesHistoryReducer from './issues_history_reducer';
import usersReducer from './users_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  teams: teamsReducer,
  ui: uiReducer,
  projects: projectsReducer,
  issues: issuesReducer,
  attachments: attachmentsReducer,
  issues_history: issuesHistoryReducer,
  users: usersReducer
})

export default rootReducer
