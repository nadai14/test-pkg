class CreateEnqQuestions < ActiveRecord::Migration
  def change
    create_table :enq_questions do |t|
      t.integer :enq_id,		null: false
      t.integer :num,			null: false
      t.integer :question_id,	null: false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:enq_questions,	[ :enq_id, :num ],	unique: true
	add_index	:enq_questions,	:question_id
  end
end
