
json.project do
  json.avatar @project.avatar.url
  json.extract!(@project, :id, :title, :key, :type, :category, :url, :created_at)
  json.issue_ids @project.issues.pluck(:id)
end

json.issues do
  @project.issues.each do |issue|
    json.set! issue.id do
      json.extract!(issue, :id, :project_id, :summary, :issue_type_id, :status_type_id, :priority_type_id, :resolution, :active, :key)
    end
  end
end
