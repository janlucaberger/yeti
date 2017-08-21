class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.integer :team_id, null: false
      t.string :title, null: false
      t.string :description, null: false
      t.string :key, null: false
      t.boolean :active, null: false, default: true
      t.timestamps
    end
  end
end
