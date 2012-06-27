require 'test_helper'

class EnqsControllerTest < ActionController::TestCase
  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get pages" do
    get :pages
    assert_response :success
  end

end
