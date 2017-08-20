class CreateUsersTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :users_teams do |t|
      t.integer :user_id, null: false
      t.integer :team_id, null: false
      t.boolean :active, null: false, default: true  
      t.timestamps
    end
  end
end
