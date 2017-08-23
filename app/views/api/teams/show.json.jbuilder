unless @team.nil?
  json.extract!(@team, :id, :team_name, :description, :private)
else
  {}
end
