<img src="https://s3.amazonaws.com/yetiapp-assets/yeti_blue_logo.png" width="150">

[Yeti live][yeti]
[yeti]: http://www.goyeti-herokuapp.com

Yeti is a project management and collaboration tool inspired by Jira and built with Ruby on Rails and React/Redux.

### Features and Implementation

#### Issue History
![image of history item  ](docs/screenshots/history_item.jpg)

In order to persist the history of issues through multiple changes, an audit table
generates a record containing the previous state and that new state. The `PATCH` request made to the Issue table and the `POST` to the IssueAudit table are performed in a transaction. In order to expand what the audit table tracks in the future the name of the changed column is stored. A future implementation would be to restrict updating to users with an authorized account type.





#### Sprint Boards
![image of sprint boards  ](docs/screenshots/sprint_boards.png)

The sprint board functionality was created using the HTML Drag and Drop API. On `dragStart` the selected issue's id and current_status_id are `set` using the `DataTransfer.setData` method. When the issue is then `dropped` on a container listening to an `onDrop` event the data is passed through the event (as outlined below.)
```javascript
dragStart(issue_id, current_status_id){
  return(e) => {
    const data = {
      issue_id
      current_status_id
    };
    e.dataTransfer.setData('text', JSON.stringify(data));
  }
}
```




### Future Directions

#### Rollback

#### React Native
I want to experiment to see how components can be restructured to be used in a React Native Application with a focus on using the TouchBackend for drag and drop.
