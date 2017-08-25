unless @issue.nil?
  json.set! @issue.id do
    json.extract!(@issue, :id, :key, :project_id, :summary, :description, :issue_type_id, :status_type_id, :priority_type_id, :resolution, :active, :sprint)
  end
else
  {}
end
