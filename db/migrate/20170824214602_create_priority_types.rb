class CreatePriorityTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :priority_types do |t|
      t.string :priority_type, null: false

      t.timestamps
    end
  end
end
