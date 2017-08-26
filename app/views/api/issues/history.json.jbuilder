users = []

json.histories do
  @issue_histories.each do |issue_history|
    json.set! issue_history.id do
      json.extract!(issue_history, :id, :column_changed, :from, :to, :issue_id, :user_id, :created_at)
    end
    users << issue_history.user unless users.include?(issue_history.user)
  end
end

json.users do
  users.each do |user|
    json.set! user.id do
      json.extract!(user, :id, :first_name, :last_name)
      json.avatar_url user.avatar.url
    end
  end
end
