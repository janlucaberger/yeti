class Sprint < ApplicationRecord

  validates :name, :start_date, :end_date, :project, :active, presence: true
  belongs_to :project

end
