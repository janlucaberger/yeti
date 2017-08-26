import _ from "lodash";

import {
  RECEIVE_ISSUE,
  RECEIVE_ISSUE_ERROR,
  RECEIVE_ISSUE_ATTACHMENT,
  REMOVE_ISSUE_ATTACHMENT,

} from '../actions/issues/issues_actions';

import { RECEIVE_PROJECT } from '../actions/projects/projects_actions'

const issuesReducer = (state = {}, action) => {
  Object.freeze(state)
  let newIssueState;
  let newAttachmentIds;
  let currentAttachmentIds;

  switch (action.type) {
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.issue)
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
      //
      let newAttachmentIds = currentAttachmentIds.concat(newAttachment.id)
      //

      newIssueState["attachment_ids"] = newAttachmentIds

      return _.merge({}, state, newIssueState)
    default:
      return state;
  }
}

export default issuesReducer
