unless @issue.nil?
  json.issue do
    json.set! @issue.id do
      json.extract!(@issue, *Issue.column_names)
      json.attachment_ids @issue.attachments.pluck(:id)
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

else
  {}
end
