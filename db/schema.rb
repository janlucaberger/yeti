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

ActiveRecord::Schema.define(version: 20170824231037) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "issue_audits", force: :cascade do |t|
    t.integer "issue_id", null: false
    t.string "column_changed", null: false
    t.string "from", null: false
    t.string "to", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "issue_types", force: :cascade do |t|
    t.string "issue_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "icon_file_name"
    t.string "icon_content_type"
    t.integer "icon_file_size"
    t.datetime "icon_updated_at"
  end

  create_table "issues", force: :cascade do |t|
    t.integer "project_id", null: false
    t.string "summary", null: false
    t.text "description"
    t.integer "issue_type_id", null: false
    t.integer "status_type_id", null: false
    t.integer "priority_type_id", default: 3, null: false
    t.string "resolution", default: "unresolved", null: false
    t.boolean "active", default: true, null: false
    t.boolean "sprint", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "key"
  end

  create_table "priority_types", force: :cascade do |t|
    t.string "priority_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "icon_file_name"
    t.string "icon_content_type"
    t.integer "icon_file_size"
    t.datetime "icon_updated_at"
  end

  create_table "projects", force: :cascade do |t|
    t.integer "team_id", null: false
    t.string "title", null: false
    t.string "description", null: false
    t.string "key", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.integer "user_id"
    t.string "type"
    t.string "category", null: false
    t.string "url"
  end

  create_table "status_types", force: :cascade do |t|
    t.string "status_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "team_name", null: false
    t.string "description"
    t.boolean "private", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "users_teams", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "team_id", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
