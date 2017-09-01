unless @issue.nil?
  json.issue do

    json.set! @issue.id do
      json.extract!(@issue, *Issue.column_names)
      json.votes @issue.votes.count
      json.current_user_voted @issue.votes.pluck(:user_id).include?(current_user.id) ? true : false
      json.watchers @issue.watchers.count
      json.current_user_watched @issue.watchers.pluck(:user_id).include?(current_user.id) ? true : false
      json.attachment_ids @issue.attachments.pluck(:id)
      json.history_ids @issue.histories.pluck(:id)
    end
  end
  json.attachments do
    @issue.attachments.each do |attachment|
      json.set! attachment.id do
        json.extract!(attachment, :id,:attachment_file_name, :attachment_content_type,:user_id, :issue_id, :created_at)
        json.attachment_url attachment.attachment.url
      end
    end
  end

  json.comments do
    @issue.comments.each do |comment|
      json.set! comment.id do
        json.extract!(comment, *Comment.column_names)
      end
    end
  end

  json.history do
    @issue.histories.each do |history|
      json.set! history.id do
        json.extract!(history, *IssueAudit.column_names)
      end
    end
  end

  json.project do
    json.set! @issue.project.id do
      json.extract!(@issue.project, *Project.column_names)
    end
  end

  json.assigned_user do
    json.set! @issue.assigned_user.id do
      json.extract!(@issue.assigned_user, :id, :first_name, :last_name, :email)
      json.avatar @issue.assigned_user.avatar.url
    end
  end

else
  {}
end
