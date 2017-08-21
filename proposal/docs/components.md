## Component Hierarchy by View


###### After logging in the page will have two main components
 - ##### NavigationContainer
  - GlobalNavContainer
  - NavDrawerContainer
 - ##### ContentContainer



The following components will be rendered within ContentContainer

## Dashboard
 - Widget
  - RecentActivity
  - AssignedIssues

## Projects
  - Search
  - ProjectTable
    - UserWidget

## Projects/:id/Backlog
  - Search
  - IssueList

## Projects/:id/Sprint
  - ScrumBoard
  - ScrumIssue

## Issues
  - Search
  - IssueTable
    - UserWidget

## Issues/:id
  - IssueForm
    - IssueTable
    - IssueAttachmentDropzone
    - IssueCommands
    - IssueSidebar
      - Tally
      - UserWidget
      - Date

<!-- DashboardContainer
ProjectsListContainer
ProjectContainer
ProjectSprintContainer
ProjectSprintContainer
ProjectIssuesContainer
IssuesListContainer
IssueContainer
ProfileContainer
TeamContainer -->
