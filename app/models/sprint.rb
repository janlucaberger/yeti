class Sprint < ApplicationRecord

  validates :name, :start_date, :end_date, :project, presence: true
  belongs_to :project

end
