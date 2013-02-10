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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130209081419) do

  create_table "budgets", :force => true do |t|
    t.integer  "month"
    t.integer  "year"
    t.float    "budget_cash"
    t.float    "remaining_cash"
    t.float    "budget_sodexo"
    t.float    "remaining_sodexo"
    t.integer  "month_owner_id"
    t.integer  "next_month_owner_id"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.boolean  "handed_over",         :default => false
  end

  create_table "expenses", :force => true do |t|
    t.string   "expense_type"
    t.text     "description"
    t.string   "payment_type"
    t.float    "amount"
    t.datetime "paid_date"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.integer  "user_id"
    t.integer  "budget_id"
    t.boolean  "is_extra"
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "password"
    t.string   "username"
  end

end
