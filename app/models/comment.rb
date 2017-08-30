class Comment < ApplicationRecord

  validates :user, :issue, :body, presence: true

  belongs_to :user
  belongs_to :issue

end
