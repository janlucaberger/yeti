current_user.assigned_issues.each do |issue|
  json.set! issue.id do
    json.extract!(issue, *Issue.column_names)
  end
end
