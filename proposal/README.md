<img src="http://i.imgur.com/8ot24fB.png" width="150">

Yeti is a project management and collaboration tool inspired by Jira and built with Ruby on Rails and React/Redux.


## Minimum Viable Product

- [ ] Hosting on Heroku
- [ ] Users can create teams, projects, issues
- [ ] Issues can be drag and dropped in an active sprint
- [ ] Changes to issues are recorded and can be rolled back to a specific time
- [ ] Users can watch, vote, and comment on issues

## Design Docs
* [View Wireframes][wireframes]
* [Views][views]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes.md
[views]: docs/views.md
[components]: docs/components.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md
[sample-state]: docs/sample-state.md


## Implementation Timeline

##### Phase 1: User Authentication (1 Days)
  - Objective: Setup user auth to restrict access to the platform to authenticated users

##### Phase 2: Navigation (1 Day)
  - Objective: Create navigation components and routes to navigate as a SPA.

##### Phase 3: Projects (2 Days)
  - Objective: Be able to view all active projects in one table view and search by project title.
  ###### Phase 3a: Backlog
    - Objective: View all unresolved issues for a project in one table

  ###### Phase 3b: Sprints
    - Objective: Be able to add issues from the backlog to a sprint and track in on a scrum board

##### Phase 4: Issues (3 Days)
  - Objective: Have a central location where all issues can be viewed in a single table.
  ###### Phase 4a: Issue
    - Objective: View all details of an issue and make any edits

  ###### Phase 4b: History
    - Objective: See a complete history of changes that have been made to the issue over time

  ###### Phase 4c: Comments
    - Objective: Give users the ability to comment on the issue

  ###### Phase 4d: Vote and Watch
    - Objective: Be able to vote and watch on issues.


##### Phase 5: Dashboard (1 Day)
- Objective: Show users the latest activity that has happened for their team as well as showing any assigned issues the user has.


##### Phase 6: Style Polishing (1 Day)
- Objective: Refine styling where needed and ensure adequate responsiveness

##### Phase 7: Deploy production (1 Day)
  - Objective: To deploy a bug free functioning product with all working MVP features
## Bonus Features

- [ ] Slack integration to push issues to team channel
- [ ] Automated welcome email on sign-up
- [ ] Time tracking for issues
- [ ] Replace Rest API with GraphQL
- [ ] Project analytics view to see workflow over a period of time
