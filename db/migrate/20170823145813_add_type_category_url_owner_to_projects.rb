class AddTypeCategoryUrlOwnerToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :user_id, :integer
    add_column :projects, :type, :string
    add_column :projects, :category, :string, null: false
    add_column :projects, :url, :string

  end
end
