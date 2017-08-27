users = []

json.issues do
  @issues.each do |issue|
    json.set! issue.id do
      json.extract!(issue, :id, :project_id, :summary, :issue_type_id, :status_type_id, :resolution, :key, :assigned_user_id)
      users << issue.assigned_user unless users.include?(issue.assigned_user)
    end
  end
end

json.assigned_users do
  users.each do |user|
    json.set! user.id do
      json.extract!(user, :id, :first_name, :last_name)
      json.avatar_url user.avatar.url
    end
  end
end
