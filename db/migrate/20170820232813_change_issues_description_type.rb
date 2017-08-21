class ChangeIssuesDescriptionType < ActiveRecord::Migration[5.1]
  def change
    change_column :issues, :description, :text
  end
end
