unless @sprint.nil?
  json.extract!(@sprint, :id, :project_id, :start_date, :end_date, :name)
else
  {}
end
