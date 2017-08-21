```json
{
  "entities": {
    "projects": {
      "1": {
        "id": 1,
        "title": "App Engineering",
        "description": "All issues having to do with engineering",
        "active": true,
        "avatar_url": "https://s3.amazonaws.com/yeti/11231234/project.png",
        "issue_ids": [1, 5, 7, 8, 9],
        "sprint": true,
        "active": true
      }
    },
    "issues": {
      "1": {
        "id": 1,
        "project_id": 1,
        "issue_type_id": 1,
        "status_type_id": 2,
        "priority": 4,
        "vote_count": 12,
        "watch_count": 3,
        "resolution": "Unresolved",
        "summary": "Create a sample state",
        "description": "<p><strong class='ql-size-large'>Things to do</strong></p><p><br></p><ul><li>Develop an initial idea of what the state will be like in the app.</li></ul><p><br></p>",
        "history_ids": [1,2,3,4],
        "comment_ids": [1,2,3,4],
        "created_at": "2017-08-23T18:25:43.511Z",
        "updated_at": "2017-08-23T18:25:43.511Z",
        "collaborators": [
          {
            "id": 1,
            "user_id": 12,
            "issue_id": 1,
            "owner": true
          }
        ]
      },
    },
    "sprints": {
      "1": {
        "id": 1,
        "project_id": 1,
        "sprint_name": "APP_1",
        "duration": 2,
        "active": true,
        "user_id": 12
      }
    },
    "issue_comments":{
      "1": {
        "id": 1,
        "issue_id": 1,
        "user_id": 12,
        "created_at": "2017-08-21T16:25:43.541Z",
        "body": "<p>Testing testing</p>"
      }
    },
    "issue_history": {
      "1": {
        "id": 1,
        "issue_id": 1,
        "user_id": 12,
        "updated_at": "2017-08-23T18:25:43.511Z",
        "changes": {
          "summary": "Create a sample state",
          "priority": 1
        }
      }
    },
    "attachments": {
      "1": {
        "id": 1,
        "issue_id": 1,
        "attachment": "https://s3.amazonaws.com/yeti/11231234/image.pdf",
        "active": true
      },
      "2": {
        "id": 2,
        "issue_id": 1,
        "attachment": "https://s3.amazonaws.com/yeti/11231234/chart.pdf",
        "active": true
      }
    },
    "users": {
      "1": {
        "id": 1,
        "first_name": "John",
        "last_name": "Smith",
        "email": "johnsmith@goyeti.io",
        "avatar_url": "https://s3.amazonaws.com/yeti/11231234/profile.png",
        "permission_type_id": 1
      }
    },
    "team": {
      "id": 1,
      "team_name": "Yeti",
      "description": "Agile development tool",
      "avatar_url": "https://s3.amazonaws.com/yeti/11231234/team.png",
      "private": true
    },
    "permission_types": {
      "1": {
        "id": 1,
        "type": "Admin"
      },
      "2": {
        "id": 2,
        "type": "Developer"
      }
    },
    "status_types": {
      "1": {
        "id": 1,
        "type": "Todo"
      },
      "2": {
        "id": 2,
        "type": "In Progress"
      },
      "3": {
        "id": 3,
        "type": "Complete"
      }
    },
    "issue_types": {
      "1": {
        "id": 1,
        "type": "Story",
        "avatar_url": "https://s3.amazonaws.com/yeti/11231234/image.png"
      },
      "2": {
        "id": 1,
        "type": "Bug",
        "avatar_url": "https://s3.amazonaws.com/yeti/11231234/bug.png"
      }
    }
  },
  "ui": {
    "current_page": "Issue"
  },
  "session":{
    "current_user": {
      "id": 1,
      "first_name": "Bob",
      "last_name": "Thebuilder",
      "email": "bob@thebuilder.com"
    },
    "current_team": {
      "id": 1,
      "team_name": "The Best Team",
      "description": "Everyone's favorite team",
      "avatar": "imageurl"
    }
  }
}

```
