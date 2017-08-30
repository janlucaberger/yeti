import _ from "lodash";

import {
  RECEIVE_ISSUE,
  RECEIVE_ALL_ISSUES,
  RECEIVE_ISSUE_ERROR,
  RECEIVE_ISSUE_ATTACHMENT,
  REMOVE_ISSUE_ATTACHMENT,
  RECEIVE_VOTE,
  RECEIVE_WATCHER,

} from '../actions/issues/issues_actions';

import { RECEIVE_TEAM_ACTIVITY } from '../actions/teams/teams_actions'
import { RECEIVE_COMPLETED_SPRINT_ISSUES } from '../actions/sprints/sprints_actions'
import { RECEIVE_PROJECT } from '../actions/projects/projects_actions'

const issuesReducer = (state = {}, action) => {
  Object.freeze(state)
  let newIssueState;
  let newAttachmentIds;
  let currentAttachmentIds;

  switch (action.type) {
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.issue)
    case RECEIVE_ALL_ISSUES:
      return action.issues.issues || {}
    case RECEIVE_PROJECT:
      return _.merge({}, state, action.project.issues)
    case REMOVE_ISSUE_ATTACHMENT:
      const removeAttachtment = action.attachment
      newIssueState = _.merge({}, state[action.attachment.issue_id])
      currentAttachmentIds = state[action.attachment.issue_id].attachment_ids

      newAttachmentIds = []
      for (let i = 0; i < currentAttachmentIds.length; i++) {
        if(currentAttachmentIds[i] !== removeAttachtment.id){
            newAttachmentIds.push(currentAttachmentIds[i])
        }
      }
      newIssueState["attachment_ids"] = newAttachmentIds
      return _.merge({}, state, newIssueState)

    case RECEIVE_ISSUE_ATTACHMENT:
      const newAttachment = action.attachment
      newIssueState = _.merge({}, state[action.attachment.issue_id])
      currentAttachmentIds = state[action.attachment.issue_id].attachment_ids
      newAttachmentIds = currentAttachmentIds.concat(newAttachment.id)
      newIssueState["attachment_ids"] = newAttachmentIds

      return _.merge({}, state, newIssueState)
    case RECEIVE_VOTE:
      newIssueState = _.merge({}, state[action.vote.issue_id])
      newIssueState.votes = action.vote.votes
      newIssueState.current_user_voted = action.vote.current_user_voted
      return _.merge({}, state, { [newIssueState.id]:  newIssueState } )
    case RECEIVE_WATCHER:
      newIssueState = _.merge({}, state[action.watcher.issue_id])
      newIssueState.watchers = action.watcher.watchers
      newIssueState.current_user_watched = action.watcher.current_user_watched
      return _.merge({}, state, { [newIssueState.id]:  newIssueState } )
    case RECEIVE_TEAM_ACTIVITY:
      return _.merge({}, state, action.activity.issues)
    case RECEIVE_COMPLETED_SPRINT_ISSUES:
      newIssueState = {}

      for(let key in state){
        if (!action.issues.issues.includes(parseInt(key))){
          newIssueState[key] = state[key]
        }
      }
      return newIssueState;
    default:
      return state;
  }
}

export default issuesReducer
