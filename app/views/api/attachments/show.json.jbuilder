unless @attachment.nil?
  json.extract!(@attachment,:id, :attachment_file_name, :attachment_content_type,:user_id, :issue_id, :created_at);
  json.attachment_url @attachment.attachment.url
else
  {}
end
