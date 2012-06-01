require 'test_helper'

class EnqsControllerTest < ActionController::TestCase
  setup do
    @enq = enqs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enqs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enq" do
    assert_difference('Enq.count') do
      post :create, enq: { css: @enq.css, description: @enq.description, enq_id: @enq.enq_id, first_page_id: @enq.first_page_id, movie: @enq.movie, status: @enq.status, thumbnail: @enq.thumbnail, title: @enq.title, update_date: @enq.update_date, update_name: @enq.update_name }
    end

    assert_redirected_to enq_path(assigns(:enq))
  end

  test "should show enq" do
    get :show, id: @enq
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @enq
    assert_response :success
  end

  test "should update enq" do
    put :update, id: @enq, enq: { css: @enq.css, description: @enq.description, enq_id: @enq.enq_id, first_page_id: @enq.first_page_id, movie: @enq.movie, status: @enq.status, thumbnail: @enq.thumbnail, title: @enq.title, update_date: @enq.update_date, update_name: @enq.update_name }
    assert_redirected_to enq_path(assigns(:enq))
  end

  test "should destroy enq" do
    assert_difference('Enq.count', -1) do
      delete :destroy, id: @enq
    end

    assert_redirected_to enqs_path
  end
end
