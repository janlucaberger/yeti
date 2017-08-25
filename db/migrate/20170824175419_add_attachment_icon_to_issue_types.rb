class AddAttachmentIconToIssueTypes < ActiveRecord::Migration[5.1]
  def self.up
    change_table :issue_types do |t|
      t.attachment :icon
    end
  end

  def self.down
    remove_attachment :issue_types, :icon
  end
end
