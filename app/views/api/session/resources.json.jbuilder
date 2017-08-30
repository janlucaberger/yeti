
json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract!(user, :id, :first_name, :last_name, :email)
      json.avatar user.avatar.url
    end
  end
end


json.ui do
  json.issue_types do
    @issue_types.each do |issue|
      json.set! issue.id do
        json.extract!(issue, *IssueType.column_names)
        json.icon_url issue.icon.url
      end
    end
  end

  json.status_types do
    @status_types.each do |status|
      json.set! status.id do
        json.extract!(status, *StatusType.column_names)
      end
    end
  end

  json.priority_types do
    @priority_types.each do |priority|
      json.set! priority.id do
        json.extract!(priority, *PriorityType.column_names)
        json.icon_url priority.icon.url
      end
    end
  end
end
