require 'test_helper'

class EnqPagesControllerTest < ActionController::TestCase
  setup do
    @enq_page = enq_pages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enq_pages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enq_page" do
    assert_difference('EnqPage.count') do
      post :create, enq_page: { description: @enq_page.description, enq_id: @enq_page.enq_id, face: @enq_page.face, next_page_id: @enq_page.next_page_id, page_id: @enq_page.page_id, update_date: @enq_page.update_date, update_name: @enq_page.update_name, wait_until: @enq_page.wait_until }
    end

    assert_redirected_to enq_page_path(assigns(:enq_page))
  end

  test "should show enq_page" do
    get :show, id: @enq_page
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @enq_page
    assert_response :success
  end

  test "should update enq_page" do
    put :update, id: @enq_page, enq_page: { description: @enq_page.description, enq_id: @enq_page.enq_id, face: @enq_page.face, next_page_id: @enq_page.next_page_id, page_id: @enq_page.page_id, update_date: @enq_page.update_date, update_name: @enq_page.update_name, wait_until: @enq_page.wait_until }
    assert_redirected_to enq_page_path(assigns(:enq_page))
  end

  test "should destroy enq_page" do
    assert_difference('EnqPage.count', -1) do
      delete :destroy, id: @enq_page
    end

    assert_redirected_to enq_pages_path
  end
end
