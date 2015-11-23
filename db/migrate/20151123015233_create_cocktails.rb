class CreateCocktails < ActiveRecord::Migration
  def change
    create_table :cocktails do |t|
      t.string :cocktail_id
      t.string :name
      t.string :image_url
      t.integer :time
      t.text :ingredients

      t.timestamps null: false
    end
  end
end
