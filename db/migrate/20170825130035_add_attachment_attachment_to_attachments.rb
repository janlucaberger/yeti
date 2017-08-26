class AddAttachmentAttachmentToAttachments < ActiveRecord::Migration[5.1]
  def self.up
    change_table :attachments do |t|
      t.attachment :attachment
    end
  end

  def self.down
    remove_attachment :attachments, :attachment
  end
end
