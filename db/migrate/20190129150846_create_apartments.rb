class CreateApartments < ActiveRecord::Migration[5.2]
  def change
    create_table :apartments do |t|
      t.decimal :price
      t.string :address
      t.string :lat
      t.string :lng
      t.integer :baths
      t.integer :beds
      t.boolean :in_unit_laundry
      t.boolean :pets_allowed
      t.boolean :has_own_parking
      t.integer :user_id

      t.timestamps
    end
  end
end
