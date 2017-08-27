class ChangeAssignedUser < ActiveRecord::Migration[5.1]
  def change
    rename_column :issues, :assigned_user, :assigned_user_id
  end
end
