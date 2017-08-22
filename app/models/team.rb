class Team < ApplicationRecord

  validates :team_name, :private, presence: true
  validates :team_name, uniqueness: true
  has_attached_file :avatar, default_url: "https://s3.amazonaws.com/yetiapp-assets/default_team_avatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many :users_teams, class_name: :UsersTeams
  has_many :users,
    through: :users_teams


  def self.by_name(query)
    capital = query.capitalize
    lowercase = query.downcase
    teams = Team.where('team_name SIMILAR TO ? OR team_name SIMILAR TO ?', "%#{capital}%", "%#{lowercase}%")
    return teams.to_a
  end
end
