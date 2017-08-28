
json.issue_id @issue.id
json.current_user_voted @issue.votes.pluck(:user_id).include?(current_user.id) ? true : false
json.votes @issue.votes.pluck(:user_id).count
