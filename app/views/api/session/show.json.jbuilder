json.current_user do
  json.partial! "api/users/user", user: @user
  json.assigned_issues @user.assigned_issues.pluck(:id)
end
json.current_team do
  json.extract! @current_team, :id, :team_name, :description
end
