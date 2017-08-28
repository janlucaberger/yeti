class IssueAudit < ApplicationRecord

  belongs_to :user
  belongs_to :issue

  has_one :project, through: :issue
end
