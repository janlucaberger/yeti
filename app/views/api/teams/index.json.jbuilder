@teams.each do |team|
  json.set! team.id do
    json.extract!(team, :id, :team_name, :description, :private)
  end
end
