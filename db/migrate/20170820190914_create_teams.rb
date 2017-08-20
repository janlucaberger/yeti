class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.string :team_name, null: false
      t.string :description
      t.boolean :private, null: false, default: true
      t.timestamps
    end
  end
end
