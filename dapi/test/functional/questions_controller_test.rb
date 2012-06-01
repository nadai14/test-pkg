require 'test_helper'

class QuestionsControllerTest < ActionController::TestCase
  setup do
    @question = questions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:questions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create question" do
    assert_difference('Question.count') do
      post :create, question: { answer_content: @question.answer_content, answer_description: @question.answer_description, content: @question.content, kind: @question.kind, question_id: @question.question_id, required: @question.required, title: @question.title, update_date: @question.update_date, update_name: @question.update_name }
    end

    assert_redirected_to question_path(assigns(:question))
  end

  test "should show question" do
    get :show, id: @question
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @question
    assert_response :success
  end

  test "should update question" do
    put :update, id: @question, question: { answer_content: @question.answer_content, answer_description: @question.answer_description, content: @question.content, kind: @question.kind, question_id: @question.question_id, required: @question.required, title: @question.title, update_date: @question.update_date, update_name: @question.update_name }
    assert_redirected_to question_path(assigns(:question))
  end

  test "should destroy question" do
    assert_difference('Question.count', -1) do
      delete :destroy, id: @question
    end

    assert_redirected_to questions_path
  end
end
