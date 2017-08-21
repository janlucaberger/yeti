class AddAttachmentAvatarToProjects < ActiveRecord::Migration[5.1]
  def self.up
    change_table :projects do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :projects, :avatar
  end
end
