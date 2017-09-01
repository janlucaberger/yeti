ids = []
projects = []

json.issues do
  current_user.assigned_issues.each do |issue|
    json.set! issue.id do
      json.extract!(issue, *Issue.column_names)
      ids << issue.id
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

json.ids ids
