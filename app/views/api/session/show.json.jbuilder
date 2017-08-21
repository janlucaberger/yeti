json.current_user do
  json.partial! "api/users/user", user: @user
end
json.current_team do
  json.extract! @current_team, :id, :team_name, :description
end
