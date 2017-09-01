
json.project do
  json.avatar @project.avatar.url
  json.extract!(@project, :id, :title, :key, :type, :category, :url, :created_at)
  json.issue_ids @project.issues.pluck(:id)
  json.issue_count Issue.where(project_id: @project.id).where("resolution = 'unresolved'").count
end

json.issues do
  @project.issues.each do |issue|
    if issue.resolution == "unresolved"
      json.set! issue.id do
        json.extract!(issue, :id, :project_id,:sprint, :summary, :issue_type_id, :status_type_id, :priority_type_id, :resolution, :active, :key)
      end
    end
  end
end


sprint = @project.sprints.where("active = true")[0]
json.sprint do
  unless sprint.nil?
    json.extract!(sprint, :id, :name, :start_date, :end_date, :project_id, :active)
  else
    json.sprint nil
  end
end
