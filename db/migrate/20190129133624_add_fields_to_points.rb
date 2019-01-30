class AddFieldsToPoints < ActiveRecord::Migration[5.2]
  def change
    add_column :points, :lat, :string
    add_column :points, :lng, :string
  end
end
