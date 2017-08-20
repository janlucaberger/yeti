# Frontend Routes
- `/dashboard` => 'DashboardContainer'
- `/projects` => 'ProjectsListContainer'
- `/projects/:id` => 'ProjectContainer'
- `/projects/:id/sprint` => 'ProjectSprintContainer'
- `/projects/:id/backlog` => 'ProjectSprintContainer'
- `/projects/:id/issues` => 'ProjectIssuesContainer'
- `/issues` => 'IssuesListContainer'
- `/issues/:id` => 'IssueContainer'
- `/profile` => 'ProfileContainer'
- `/team` => 'TeamContainer'

# Backend Routes

## Users
  - `POST   /api/users`
  - `PATCH  /api/users/:id`
  - `DELETE /api/users/:id`
  - Issues - LIMIT 10
  - `GET    /api/users/:id/issues`
  - Comments - LIMIT 10
  - `GET    /api/users/:id/comments`

## Sessions
  - `POST    /api/sessions`
  - `DELETE  /api/sessions`

## Teams
  - `POST   /api/teams`  
  - `GET    /api/teams/:id`  
  - `PATCH  /api/teams/:id`
  - `GET    /api/teams/activity`
  - `GET    /api/teams/users`

## Projects
  - `GET    /api/projects/`
  - `GET    /api/projects/list` ** (ID, title, image_avatar)
  - `GET    /api/projects/:id`
  - `GET    /api/projects/:id/issues`
  - `POST   /api/projects`
  - `PATCH  /api/projects/:id`
  - `DELETE /api/projects/:id`
  - Sprints
  - `GET    /api/projects/:id/sprint`
  - `POST    /api/projects/:id/sprint`

## Issues
  - `POST   /api/issues`
  - `GET    /api/issues/`
  - `GET    /api/issues/:id`
  - `PATCH  /api/issues/:id`
  - `DELETE /api/issues/:id`

  - Attachments
  - `GET   /api/issues/:id/attachments`
  - `POST   /api/issues/:id/attachments`
  - `DELETE   /api/issues/:id/attachments`
  - Comments
  - `GET    /api/issues/:id/comments`
  - `POST   /api/issues/:id/comments`
  - `DELETE /api/issues/:id/comments`

  - Votes
  - `POST   /api/issues/:id/votes`
  - `DELETE /api/issues/:id/votes`

  - Watchers
  - `POST   /api/issues/:id/watchers`
  - `DELETE /api/issues/:id/watchers`

  - History
  - `GET    /api/issues/:id/history`

<!-- ## Comments
  - `GET /recent_comments`

## Activity
  - `GET /recent_activity` -->

<br>

  The following routes are mainly for UI for now
  ## Issue Types
  - `GET /api/issue_types`

  ## Status Types
  - `GET /api/status_types`

  <!-- ## User Permission Types
  - `GET /api/user_permission_types` -->

___
<!--
## Sign up
- POST /users { firstname, lastname, email, password_digest}
- POST /sessions

## Create or Join Team
If creating a new team
- POST /teams {teamname, description, image_avatar, private}
- POST /users_teams {user_id, team_id, user_permission_type_id}

If joining a public team
- POST /users_teams {user_id, team_id, status, user_permission_type_id}
  - Default permission type will be set to lowest access
  - Status will be set to ACTIVE

If joining a private team
- POST /users_teams {user_id, team_id, status, user_permission_type_id}
  - Status will be set to PENDING and team owner can approve application


## Dashboard
- GET /projects
- GET /issues (Specifically issues assigned to user)
 -->


## Users
- `POST   /api/users`

  - Required params: `first_name, last_name, email`
  - Optional params: `avatar_url`
  - `email` must be unique
  > When creating users their *default permission type will be set to the lowest
  permission settings*. The value can be changed by team admin.

- `PATCH  /api/users/:id`




## Teams
- `POST   /api/teams`  

  - Required params: `team_name`
  - Optional params: `description, avatar_url`
  - `team_name` must be unique
  > FUTURE FEATURE: For the V1 all teams will be set to private. A later feature will be the ability to set teams to public that anyone can join.


- `PATCH  /api/teams/:id`

  - Permitted changes: `description, avatar_url`


##awesome-section
## Projects
- `GET    /api/projects/`
  -
  > FUTURE FEATURE: Add ability to request all projects including historical (ie deleted) through query params

- `GET    /api/projects/:id`
- `GET    /api/projects/:id/issues`
> Returns all issues for the project where status is active regard
- `GET    /api/projects/:id/backlog`
- `GET    /api/projects/:id/sprint`
- `POST   /api/projects`
  ###### Notes
  - Required params: `title, description`
  - Optional params: `avatar_url`


- `PATCH  /api/projects/:id`
  ###### Notes
  - Permitted changes: `title, description, email, avatar_url`


- `DELETE /api/projects/:id`
  ###### Notes
  > In order to preserve data for reports and issue relations, requests made to *DELETE will set the project's ACTIVE property to false* rather than deleting the record from the database


## Issues
- `POST   /api/issues`

  - Required params: `summary, issue_type_id`
  - Optional params: `description, attachment`


- `GET    /api/issues/:id`
- `PATCH  /api/issues/:id`

  - Permitted Changes: `summary, description, issue_type_id, attachments`
    > All patch requests made will also be logged in the issues audit table for issue history logging.
- `DELETE /api/issues/:id`

- Comments
- `GET    /api/issues/:id/comments`
- `POST   /api/issues/:id/comments`
- `DELETE /api/issues/:id/comments`

- Votes
- `POST   /api/issues/:id/comments`
- `DELETE /api/issues/:id/comments`

- Watchers
- `POST   /api/issues/:id/comments`
- `DELETE /api/issues/:id/comments`

- History
- `GET    /api/issues/:id/history`




The following routes are mainly for UI for now
## Issue Types
- `GET /api/issue_types`

## Status Types
- `GET /api/status_types`

## User Permission Types
- `GET /api/user_permission_types`
