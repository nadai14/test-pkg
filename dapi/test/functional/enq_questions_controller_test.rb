require 'test_helper'

class EnqQuestionsControllerTest < ActionController::TestCase
  setup do
    @enq_question = enq_questions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enq_questions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enq_question" do
    assert_difference('EnqQuestion.count') do
      post :create, enq_question: { enq_id: @enq_question.enq_id, num: @enq_question.num, question_id: @enq_question.question_id, update_date: @enq_question.update_date, update_name: @enq_question.update_name }
    end

    assert_redirected_to enq_question_path(assigns(:enq_question))
  end

  test "should show enq_question" do
    get :show, id: @enq_question
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @enq_question
    assert_response :success
  end

  test "should update enq_question" do
    put :update, id: @enq_question, enq_question: { enq_id: @enq_question.enq_id, num: @enq_question.num, question_id: @enq_question.question_id, update_date: @enq_question.update_date, update_name: @enq_question.update_name }
    assert_redirected_to enq_question_path(assigns(:enq_question))
  end

  test "should destroy enq_question" do
    assert_difference('EnqQuestion.count', -1) do
      delete :destroy, id: @enq_question
    end

    assert_redirected_to enq_questions_path
  end
end
