json.extract!(@page, *extract_nil(@page, :uuid, :description, :next_page_id, :wait_until))
json.enq_id @page.enq_face.enq_id
json.question_cnt @count # TODO: move to the campaigin api

json.questions do |json|
  json.array!(@page.enq_questions) do |json, enq_question|
    json.(enq_question, :num, :seq)
    json.(enq_question.question, :kind, :required)
    json.title (enq_question.question.title.nil? ? "" : enq_question.question.title)
    json.content (enq_question.question.content.nil? ? "" : enq_question.question.content)

    json.choices do |json|
      json.array!(enq_question.question.choices) do |json, choice|
        json.(choice, :uuid, :content)
      end
    end

    json.branches do |json|
      json.array!(enq_question.branches) do |json, branch|
        json.extract!(branch, *extract_nil(branch, :answer, :next_page_id, :wait_until))
      end
    end

    enq_question.question.tap do |q|
      unless q.answer_content.nil?
        json.answer do |json|
          json.content q.answer_content
          json.description q.answer_description unless q.answer_description.nil?
        end
      end
    end
  end
end


