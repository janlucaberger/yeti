json.history do
  json.extract!(@issueAudit, *IssueAudit.column_names)
end

json.issue do
  json.id @issueAudit.issue.id
  json.history_ids @issueAudit.issue.histories.pluck(:id)
end
