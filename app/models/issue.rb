class Issue < ApplicationRecord

  validates :project_id, :summary, :issue_type_id, :status_type_id, :priority_type_id, :resolution, :key, presence: true
  validates :active, :sprint, inclusion: { in: [ true, false] }

  belongs_to :project
  has_one :team,
    through: :project
  has_many :attachments
  belongs_to :assigned_user, class_name: :User, foreign_key: :assigned_user_id
  has_many :votes
  has_many :watchers
  has_many :histories, class_name: :IssueAudit, foreign_key: :issue_id
  has_many :comments
  
  def self.get_history
  end

  def self.get_watch_count
  end

  def self.get_vote_count

  end

end
