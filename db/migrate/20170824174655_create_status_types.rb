class CreateStatusTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :status_types do |t|
      t.string :status_type, null: false
      t.timestamps
    end
  end
end
