class Project < ApplicationRecord

  validates :team, :title, :description, :key, :active, presence: true 

  belongs_to :team

end
