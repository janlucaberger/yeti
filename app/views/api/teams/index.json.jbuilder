if @teams.count >= 1
  @teams.each do |team|
    json.set! team.id do
      json.extract!(team, :id, :team_name, :description, :private)
      json.avatar team.avatar.url
    end
  end
else
  {}
end
