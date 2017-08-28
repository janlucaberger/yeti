class ChangeWatchesToWatchers < ActiveRecord::Migration[5.1]
  def change
    rename_table :watches, :watchers
  end
end
