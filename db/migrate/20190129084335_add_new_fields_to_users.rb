class AddNewFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :signed_up_with_oauth, :boolean
    add_column :users, :img, :text
  end
end
