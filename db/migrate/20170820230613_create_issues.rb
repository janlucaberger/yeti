class CreateIssues < ActiveRecord::Migration[5.1]
  def change
    create_table :issues do |t|
      t.integer :project_id, null: false
      t.string :summary, null: false
      t.string :description
      t.integer :issue_type_id, null: false
      t.integer :status_type_id, null: false
      t.integer :priority, null: false, default: 3
      t.string :resolution, null: false, default: "unresolved"
      t.boolean :active, null: false, default: true
      t.boolean :sprint, null: false, default: false
      t.timestamps
    end
  end
end
