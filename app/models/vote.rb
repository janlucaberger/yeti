class Vote < ApplicationRecord

  validates :user, :issue, presence: true

  belongs_to :user
  belongs_to :issue

end
