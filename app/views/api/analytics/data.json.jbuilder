


types = @count_type.map do |id, val|
  {issue_type: IssueType.find(id).issue_type.to_s, count: val}
end
projects = @count_project.map do |id, val|
  {project: Project.find(id).title.to_s, count: val}
end
priorities = @count_priority.map do |id, val|
  {id: id, priority_type: PriorityType.find(id).priority_type.to_s, count: val}
end

json.type_count types
json.project_count projects
json.priority_count priorities
