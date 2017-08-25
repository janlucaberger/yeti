class ChangeIssues < ActiveRecord::Migration[5.1]
  def change
    rename_column :issues, :priority, :priority_type_id
  end
end
