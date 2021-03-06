# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151123015820) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "barfaves", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "bar_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bars", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.float    "longitude"
    t.float    "latitude"
    t.text     "offer"
    t.string   "image_url"
    t.string   "phone"
    t.string   "website"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cocktails", force: :cascade do |t|
    t.string   "cocktail_id"
    t.string   "name"
    t.string   "image_url"
    t.integer  "time"
    t.text     "ingredients"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "drinkfaves", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "cocktail_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.text     "address"
    t.integer  "access_level"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
