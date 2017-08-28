class CreateWatches < ActiveRecord::Migration[5.1]
  def change
    create_table :watches do |t|
      t.integer :user_id, null: false
      t.integer :issue_id, null: false

      t.timestamps
    end
  end
end
