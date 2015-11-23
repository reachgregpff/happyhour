class CreateDrinkfaves < ActiveRecord::Migration
  def change
    create_table :drinkfaves do |t|
      t.integer :user_id
      t.integer :cocktail_id

      t.timestamps null: false
    end
  end
end
