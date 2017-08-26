class Attachment < ApplicationRecord

  has_attached_file :attachment, default_url: ""
  validates_attachment_content_type :attachment, :content_type => [/\Aimage\/.*\Z/, /\Avideo\/.*\Z/, /\Aaudio\/.*\Z/, /\Aapplication\/.*\Z/]


  belongs_to :user
  belongs_to :issue
  has_one :project, through: :issue

end
