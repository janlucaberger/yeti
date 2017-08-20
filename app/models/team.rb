class Team < ApplicationRecord

  validates :team_name, :private, presence: true
  validates :team_name, uniqueness: true

  has_many :users_teams, class_name: :UsersTeams
  has_many :users,
    through: :users_teams

end
