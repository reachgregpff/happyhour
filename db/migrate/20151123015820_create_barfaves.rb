class CreateBarfaves < ActiveRecord::Migration
  def change
    create_table :barfaves do |t|
      t.integer :user_id
      t.integer :bar_id

      t.timestamps null: false
    end
  end
end
