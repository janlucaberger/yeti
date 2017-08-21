class Issue < ApplicationRecord

  validates :project, :summary, :issue_type_id, :status_type_id, :priority, :resolution, :active, :sprint, presence: true

  belongs_to :project


end
