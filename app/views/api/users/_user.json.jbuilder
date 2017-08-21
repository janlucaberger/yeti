json.extract!(user, :id, :first_name, :last_name, :email)
json.avatar user.avatar.url
