class Issue < ApplicationRecord

  validates :project_id, :summary, :issue_type_id, :status_type_id, :priority_type_id, :resolution, :key, presence: true
  validates :active, :sprint, inclusion: { in: [ true, false] }

  belongs_to :project
  has_one :team,
    through: :project


  def self.get_history
  end

  def self.get_watch_count
  end

  def self.get_vote_count

  end

end
