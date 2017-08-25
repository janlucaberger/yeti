class AddAttachmentIconToPriorityTypes < ActiveRecord::Migration[5.1]
  def self.up
    change_table :priority_types do |t|
      t.attachment :icon
    end
  end

  def self.down
    remove_attachment :priority_types, :icon
  end
end
