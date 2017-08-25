class IssueType < ApplicationRecord
  has_attached_file :icon, default_url: ""
  validates_attachment_content_type :icon, content_type: /\Aimage\/.*\z/

end
