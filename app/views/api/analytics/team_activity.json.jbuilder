users = []
issues = []
projects = []
json.activity do
  @activity.each do |activity|
    json.set! activity.id do
      json.extract!(activity, :id, :issue_id, :column_changed, :from, :to, :user_id, :created_at)
      users << activity.user unless users.include?(activity.user)
      issues << activity.issue unless issues.include?(activity.issue)
    end
  end
end

json.users do
  users.each do |user|
    json.set! user.id do
      json.extract!(user, :id, :first_name, :last_name, :email)
      json.avatar user.avatar.url
    end
  end
end

json.issues do
  issues.each do |issue|
    json.set! issue.id do
      json.extract!(issue, :id, :summary, :project_id)
      projects << issue.project unless projects.include?(issue.project)
    end
  end
end

json.projects do
  projects.each do |project|
    json.set! project.id do
      json.extract!(project, :id, :title)
      json.avatar project.avatar.url
    end
  end
end

json.ui do
  json.status_types do
    @status_types.each do |status|
      json.set! status.id do
        json.extract!(status, :id, :status_type)
      end
    end
  end
  json.priority_types do
    @priority_types.each do |priority|
      json.set! priority.id do
        json.extract!(priority, :id, :priority_type)
        json.icon priority.icon.url
      end
    end
  end
  json.issue_types do
    @issue_types.each do |issue|
      json.set! issue.id do
        json.extract!(issue, :id, :issue_type)
        json.icon issue.icon.url
      end
    end
  end
end
