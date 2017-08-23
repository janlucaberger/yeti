class Project < ApplicationRecord

  validates :team,
      :title,
      :description,
      :key,
      :active,
      :category,
      :user,
      presence: true

  has_attached_file :avatar, default_url: "https://s3.amazonaws.com/yetiapp-assets/default_project_avatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  belongs_to :team
  belongs_to :user

end
