@users.each do |team_user|
  json.set! team_user.id do
      json.extract!(team_user, :id, :first_name, :last_name, :email)
  end
end
