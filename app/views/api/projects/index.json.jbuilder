unless @projects.nil?
  @projects.each do |project|
    json.set! project.id do
      json.avatar project.avatar.url
      json.extract!(project, :id, :title, :key, :type, :category, :url, :created_at)
      json.issue_count Issue.where(project_id: project.id).where("resolution = 'unresolved'").count
    end
  end
else
  {}
end
