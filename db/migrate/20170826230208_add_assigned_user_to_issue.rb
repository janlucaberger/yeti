class AddAssignedUserToIssue < ActiveRecord::Migration[5.1]
  def change
    add_column :issues, :assigned_user, :integer
  end
end
