
json.issue_id @issue.id
json.current_user_watched @issue.watchers.pluck(:user_id).include?(current_user.id) ? true : false
json.watchers @issue.watchers.pluck(:user_id).count
