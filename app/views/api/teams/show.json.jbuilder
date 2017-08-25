unless @team.nil?
  json.extract!(@team, :id, :team_name, :description, :private)
  json.avatar_url @team.avatar.url
else
  {}
end
