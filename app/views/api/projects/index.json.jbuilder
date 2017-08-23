unless @projects.nil?
  @projects.each do |project|
    json.set! project.id do
      json.avatar project.avatar.url
      json.extract!(project, :id, :title, :key, :type, :category, :url, :created_at)
    end
  end
else
  {}
end
