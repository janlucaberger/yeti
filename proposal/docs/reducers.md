
```
rootReducer: {
  entities: entitiesReducer,
  ui: uiReducer
}

entitiesReducer: {
  projects: projectsReducer,
  issues: issuesReducer,
  sprints: sprintsReducer,
  team_activity: team_activityReducer,
  issueHistory: issueHistoryReducer,
  attachments: attachmentsReducer,
  users: usersReducer,
  permissions: permissionsReducer,
  team: teamReducer,
  statusTypes: statusTypesReducer,
  issueTypes: issueTypesReducer,
}

uiReducer: {
  modal:{
    display: BOOL,
    component: component,
    props: props,
  },
  current_page:
}
```

#Actions

## Projects

RECEIVE_ALL_PROJECTS
RECEIVE_PROJECT
REMOVE_PROJECT


## Issues

RECEIVE_ALL_ISSUES
RECEIVE_ISSUE
REMOVE_ISSUE


RECEIVE_VOTE
RECEIVE_WATCHER
REMOVE_VOTE
REMOVE_WATCHER

RECEIVE COMMENT
