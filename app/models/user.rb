class User < ApplicationRecord

  after_initialize :ensure_session_token

  validates :first_name, :last_name, :session_token, :password_digest, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :avatar, default_url: "https://s3.amazonaws.com/yetiapp-assets/default_avatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many :users_teams, class_name: :UsersTeams
  has_many :teams, through: :users_teams
  has_many :attachments
  has_many :assigned_issues, class_name: :Issue, foreign_key: :assigned_user_id
  has_many :votes
  has_many :watchers
  has_many :comments
  
  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def self.generate_token
    SecureRandom.urlsafe_base64(16)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_token
    self.save!
    self.session_token
  end

  def reset_session_token!
    self.session_token = User.generate_token
    self.save!
    self.session_token
  end

end
