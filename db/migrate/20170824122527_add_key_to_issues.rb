class AddKeyToIssues < ActiveRecord::Migration[5.1]
  def change
    add_column :issues, :key, :string
  end
end
