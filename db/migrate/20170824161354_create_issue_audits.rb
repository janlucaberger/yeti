class CreateIssueAudits < ActiveRecord::Migration[5.1]
  def change
    create_table :issue_audits do |t|
      t.integer :issue_id, null: false
      t.string :column_changed, null: false
      t.string :from, null: false
      t.string :to, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
