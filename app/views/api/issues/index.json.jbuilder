users = []
projects = []

json.issues do
  @issues.each do |issue|
    json.set! issue.id do
      json.extract!(issue, :id, :issue_type_id, :priority_type_id, :project_id, :active, :summary, :status_type_id, :resolution, :key, :sprint, :assigned_user_id, :created_at, :updated_at)
      users << issue.assigned_user unless users.include?(issue.assigned_user)
      projects << issue.project unless projects.include?(issue.project)
    end
  end
end

json.projects do
  projects.each do |project|
    json.set! project.id do
      json.extract!(project, *Project.column_names)
    end
  end
end

json.assigned_users do
  users.each do |user|
    json.set! user.id do
      json.extract!(user, :id, :first_name, :last_name)
      json.avatar user.avatar.url
    end
  end
end
