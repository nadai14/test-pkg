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

ActiveRecord::Schema.define(:version => 20120601035448) do

  create_table "answers", :force => true do |t|
    t.integer  "enq_id",      :null => false
    t.string   "num",         :null => false
    t.string   "answer",      :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "answers", ["enq_id", "num"], :name => "index_answers_on_enq_id_and_num", :unique => true

  create_table "branches", :force => true do |t|
    t.integer  "enq_id",       :null => false
    t.integer  "num",          :null => false
    t.string   "answer",       :null => false
    t.integer  "next_page_id", :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "branches", ["enq_id", "num", "answer"], :name => "index_branches_on_enq_id_and_num_and_answer", :unique => true
  add_index "branches", ["next_page_id"], :name => "index_branches_on_next_page_id"

  create_table "choices", :force => true do |t|
    t.integer  "question_id", :null => false
    t.integer  "choice_id",   :null => false
    t.string   "content",     :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "choices", ["question_id", "choice_id"], :name => "index_choices_on_question_id_and_choice_id", :unique => true

  create_table "enq_pages", :force => true do |t|
    t.integer  "enq_id",                         :null => false
    t.integer  "page_id",                        :null => false
    t.string   "face",         :default => "PC", :null => false
    t.string   "description"
    t.time     "wait_until"
    t.integer  "next_page_id"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "enq_pages", ["enq_id", "page_id", "face"], :name => "index_enq_pages_on_enq_id_and_page_id_and_face", :unique => true

  create_table "enq_questions", :force => true do |t|
    t.integer  "enq_id",      :null => false
    t.integer  "num",         :null => false
    t.integer  "question_id", :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "enq_questions", ["enq_id", "num"], :name => "index_enq_questions_on_enq_id_and_num", :unique => true
  add_index "enq_questions", ["question_id"], :name => "index_enq_questions_on_question_id"

  create_table "enqs", :force => true do |t|
    t.integer  "enq_id",                       :null => false
    t.integer  "first_page_id", :default => 1, :null => false
    t.integer  "status",        :default => 0, :null => false
    t.string   "title"
    t.string   "description"
    t.string   "css"
    t.string   "movie"
    t.string   "thumbnail"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "enqs", ["enq_id"], :name => "index_enqs_on_enq_id", :unique => true

  create_table "questions", :force => true do |t|
    t.integer  "question_id",        :null => false
    t.string   "kind",               :null => false
    t.string   "title"
    t.string   "content"
    t.boolean  "required"
    t.string   "answer_content"
    t.string   "answer_description"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  add_index "questions", ["question_id"], :name => "index_questions_on_question_id", :unique => true

end
