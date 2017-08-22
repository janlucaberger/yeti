unless @users === undefined
  @users.each do |user|
    json.set! user.id do
      json.extract!(user, :id, :first_name, :last_name, :avatar)
    end
  end
else
  {}
end
