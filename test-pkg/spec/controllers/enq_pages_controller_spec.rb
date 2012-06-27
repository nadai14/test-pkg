#coding: utf-8
require 'spec_helper'
require 'support/custom_machers'
require 'json/pure' # gem install json_pure

describe EnqPagesController do
  describe "アンケートページ情報取得機能テスト" do
    fixtures :enqs, :enq_faces, :enq_pages, :enq_questions, :choices, :branches, :questions, :answers, :campaigns
    render_views
    
    before do
      request.env['X-Requested-By'] = 'poncan-moviereward'
    end
  
    context "/api/v1/enqs/1001/pages/1" do
      context "指定されたページヘのルートが正しく設定されているか" do
        describe :routes do
          subject{{:get => "/api/v1/enqs/1001/pages/1"}}
          it{should route_to(controller: "enq_pages", action: "show", enq_id: "1001", id: "1", format: :json)}
        end
      
        before{get :show, {id: enq_pages(:sc_SP_page3).id, enq_id: enqs(:status1).id, face: "SP", format: :json}}
      
        describe :response do
          subject{response}
          it{should be_success}
        end
      end

      context "ページID、アンケートIDとフェイスから値を取得する" do
        describe "レスポンスは正しく返ってきているか" do
          before {get :show, {id: enq_pages(:sc_SP_page3).id, enq_id: enqs(:status1).id, face: "SP", format: :json}}
        
          it 'レスポンスフォーマットの確認' do
            response.should be_success
            response.content_type.should == Mime::JSON
          end

          it 'カラムの確認' do
            arr = JSON.parse(response.body)
            [:enq_id, :uuid, :description, :question_cnt, :next_page_id, :wait_until].each do |key|
              arr.should have_key("#{key}")
            end

            arr_questions = arr["questions"][0]
            [:num, :seq, :kind, :title, :content, :required].each do |key|
              arr_questions.should have_key("#{key}")
            end
            
            arr_choices = arr_questions["choices"][0]
            [:uuid, :content].each do |key|
              arr_choices.should have_key("#{key}")
            end

            arr_branches = arr_questions["branches"][0]
            [:answer, :next_page_id, :wait_until].each do |key|
              arr_branches.should have_key("#{key}")
            end

            arr_answer = arr_questions["answer"]
            [:content, :description].each do |key|
              arr_answer.should have_key("#{key}")
            end
          end

          it 'レスポンスの表示(目検用)' do
            puts "response_body: #{response.body}"
          end
        end
      
        describe "要素が nil の時" do
          context "PCからアクセスした場合" do
            describe ":enq_pages.description, :enq_pages.wait_until, :choices, :branches.wait_until, :answer.description が nil の時" do
              before {get :show, {id: enq_pages(:nullable_PC_page1).id, enq_id: enqs(:nullable).id, face: "PC", format: :json}}

              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:description, :wait_until].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end

              it 'choicesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:choices].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            
              it 'branchesは不要な要素を返していないか' do
                arr_branches = JSON.parse(response.body)["questions"][0]["branches"][0]
                [:wait_until].each do |key|
                  arr_branches.should_not have_key("#{key}")
                end
              end

              it 'answerは不要な要素を返していないか' do
                arr_answer = JSON.parse(response.body)["questions"][0]["answer"]
                [:description].each do |key|
                  arr_answer.should_not have_key("#{key}")
                end
              end
            end

            describe ":enq_pages.next_page_id, :questions が nil の時" do
              before {get :show, {id: enq_pages(:nullable_PC_page2_1).id, enq_id: enqs(:nullable).id, face: "PC", format: :json}}

              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:next_page_id].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end

              it 'questionsは空の配列を返しているか' do
                arr = JSON.parse(response.body)
                arr.should have_key("questions")
                arr["questions"].should be_empty
              end
            end
          
            describe ":branches が nil の時" do
              before {get :show, {id: enq_pages(:nullable_PC_page2_2).id, enq_id: enqs(:nullable).id, face: "PC", format: :json}}

              it 'branchesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:branches].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            end
          end

          context "スマートフォンからアクセスした場合" do
            describe ":enq_pages.description, :enq_pages.wait_until, :choices, :branches.wait_until, :answer.description が nil の時" do
              before {get :show, {id: enq_pages(:nullable_SP_page1).id, enq_id: enqs(:nullable).id, face: "SP", format: :json}}

              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:description, :wait_until].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end

              it 'choicesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:choices].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            
              it 'branchesは不要な要素を返していないか' do
                arr_branches = JSON.parse(response.body)["questions"][0]["branches"][0]
                [:wait_until].each do |key|
                  arr_branches.should_not have_key("#{key}")
                end
              end

              it 'answerは不要な要素を返していないか' do
                arr_answer = JSON.parse(response.body)["questions"][0]["answer"]
                [:description].each do |key|
                  arr_answer.should_not have_key("#{key}")
                end
              end
            end

            describe ":enq_pages.next_page_id, :questions が nil の時" do
              before {get :show, {id: enq_pages(:nullable_SP_page2_1).id, enq_id: enqs(:nullable).id, face: "SP", format: :json}}

              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:next_page_id].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end

              it 'questionsは空の配列を返しているか' do
                arr = JSON.parse(response.body)
                arr.should have_key("questions")
                arr["questions"].should be_empty
              end
            end
          
            describe ":branches が nil の時" do
              before {get :show, {id: enq_pages(:nullable_SP_page2_2).id, enq_id: enqs(:nullable).id, face: "SP", format: :json}}

              it 'branchesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:branches].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            end
          end
        end

        describe "異常系は動作しているか" do
          context "認可されていない時" do
            describe :response do
              before do
                request.env['X-Requested-By'] = 'failed_request'
                get :show, {id: enq_pages(:sc_SP_page1).id, enq_id: enqs(:status1).id, face: "SP", format: :json}
              end
            
              it 'status 401(UnauthorizedException) を返す' do
                response.status.should == 401
              end
            end
          end
        
          context "アンケートIDが存在しない時" do
            before{get :show, {id: enq_pages(:sc_SP_page1).id, enq_id: "failed_id", face: "SP", format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end
        
          context "ページIDが存在しない時" do
            before{get :show, {id: "failed_id", enq_id: enqs(:status1).id, face: "SP", format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end

          context "アンケートIDとページIDが矛盾していた時" do
            before{get :show, {id: enq_pages(:sc_SP_page2), enq_id: enqs(:nullable).id, face: "SP", format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end

          context "設問と選択肢が矛盾している時" do
            before{get :show, {id: enq_pages(:incons_question_SP).id, enq_id: enqs(:incons_question).id, face: "SP", format: :json}}
        
            it 'status 500(DataIncompletedException) を返す' do
              response.status.should == 500
            end
          end
        end
      end
    end

    context "/api/v1/enqs/1001/pages/first" do
      context "指定されたページヘのルートが正しく設定されているか" do
        describe :routes do
          subject{{:get => "/api/v1/enqs/1001/pages/first"}}
          it{should route_to(controller: "enq_pages", action: "show", enq_id: "1001", id: "first", format: :json)}
        end
      
        before{get :show, {id: "first", enq_id: enqs(:status1_first).id, face: "PC", format: :json}}
      
        describe :response do
          subject{response}
          it{should be_success}
        end
      end
 
      context "ページID、アンケートIDとフェイスから値を取得する" do
        describe "レスポンスは正しく返ってきているか" do
          before {get :show, {id: "first", enq_id: enqs(:status1_first).id, face: "SP", format: :json}}
        
          it 'レスポンスフォーマットの確認' do
            response.should be_success
            response.content_type.should == Mime::JSON
          end
 
          it 'カラムの確認' do
            arr = JSON.parse(response.body)
            [:enq_id, :uuid, :description, :question_cnt, :next_page_id, :wait_until].each do |key|
              arr.should have_key("#{key}")
            end
 
            arr_questions = arr["questions"][0]
            [:num, :seq, :kind, :title, :content, :required].each do |key|
              arr_questions.should have_key("#{key}")
            end
            
            arr_choices = arr_questions["choices"][0]
            [:uuid, :content].each do |key|
              arr_choices.should have_key("#{key}")
            end
 
            arr_branches = arr_questions["branches"][0]
            [:answer, :next_page_id, :wait_until].each do |key|
              arr_branches.should have_key("#{key}")
            end
 
            arr_answer = arr_questions["answer"]
            [:content, :description].each do |key|
              arr_answer.should have_key("#{key}")
            end
          end
 
          it 'レスポンスの表示(目検用)' do
            puts "response_body_First: #{response.body}"
          end
        end
      
        describe "要素が nil の時" do
          context "PCからアクセスした場合" do
            describe ":enq_pages.description, :enq_pages.wait_until, :choices, :branches.wait_until, :answer.description が nil の時" do
              before {get :show, {id: "first", enq_id: enqs(:nullable_first_1).id, face: "PC", format: :json}}
 
              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:description, :wait_until].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end
 
              it 'choicesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:choices].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            
              it 'branchesは不要な要素を返していないか' do
                arr_branches = JSON.parse(response.body)["questions"][0]["branches"][0]
                [:wait_until].each do |key|
                  arr_branches.should_not have_key("#{key}")
                end
              end
 
              it 'answerは不要な要素を返していないか' do
                arr_answer = JSON.parse(response.body)["questions"][0]["answer"]
                [:description].each do |key|
                  arr_answer.should_not have_key("#{key}")
                end
              end
            end
 
            describe ":enq_pages.next_page_id, :questions が nil の時" do
              before {get :show, {id: "first", enq_id: enqs(:nullable_first_2).id, face: "PC", format: :json}}
 
              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:next_page_id].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end
 
              it 'questionsは空の配列を返しているか' do
                arr = JSON.parse(response.body)
                arr.should have_key("questions")
                arr["questions"].should be_empty
              end
            end
          
            describe ":branches が nil の時" do
              before {get :show, {id: "first", enq_id: enqs(:nullable_first_3).id, face: "PC", format: :json}}
 
              it 'branchesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:branches].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            end
          end
 
          context "スマートフォンからアクセスした場合" do
            describe ":enq_pages.description, :enq_pages.wait_until, :choices, :branches.wait_until, :answer.description が nil の時" do
              before {get :show, {id: "first", enq_id: enqs(:nullable_first_1).id, face: "SP", format: :json}}
 
              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:description, :wait_until].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end
 
              it 'choicesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:choices].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            
              it 'branchesは不要な要素を返していないか' do
                arr_branches = JSON.parse(response.body)["questions"][0]["branches"][0]
                [:wait_until].each do |key|
                  arr_branches.should_not have_key("#{key}")
                end
              end
 
              it 'answerは不要な要素を返していないか' do
                arr_answer = JSON.parse(response.body)["questions"][0]["answer"]
                [:description].each do |key|
                  arr_answer.should_not have_key("#{key}")
                end
              end
            end
 
            describe ":enq_pages.next_page_id, :questions が nil の時" do
              before {get :show, {id: "first", enq_id: enqs(:nullable_first_2).id, face: "SP", format: :json}}
 
              it 'enq_pagesは不要な要素を返していないか' do
                arr = JSON.parse(response.body)
                [:next_page_id].each do |key|
                  arr.should_not have_key("#{key}") 
                end
              end
 
              it 'questionsは空の配列を返しているか' do
                arr = JSON.parse(response.body)
                arr.should have_key("questions")
                arr["questions"].should be_empty
              end
            end
          
            describe ":branches が nil の時" do
              before {get :show, {id: "first", enq_id: enqs(:nullable_first_3).id, face: "SP", format: :json}}
 
              it 'branchesは空の配列を返しているか' do
                arr_questions = JSON.parse(response.body)["questions"][0]
                [:branches].each do |key|
                  arr_questions.should have_key("#{key}")
                  arr_questions["#{key}"].should be_empty
                end
              end
            end
          end
        end
 
        describe "異常系は動作しているか" do
          context "認可されていない時" do
            describe :response do
              before do
                request.env['X-Requested-By'] = 'failed_request'
                get :show, {id: "first", enq_id: enqs(:status1_first).id, face: "SP", format: :json}
              end
            
              it 'status 401(UnauthorizedException) を返す' do
                response.status.should == 401
              end
            end
          end
        
          context "アンケートIDが存在しない時" do
            before{get :show, {id: "first", enq_id: "failed_id", face: "SP", format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end
        
          context "アンケートの最初のページが nil だった時" do
            context "最初のページ(first_page_idのページ)が存在しない時" do
              before{get :show, {id: "first", enq_id: enqs(:first_page_null).id, face: "SP", format: :json}}
         
              it 'status 404(NotFoundException) を返す' do
                response.status.should == 404
              end
            end

            context "first_page_idがNULLの時" do
              before{get :show, {id: "first", enq_id: enqs(:first_page_id_null).id, face: "SP", format: :json}}
         
              it 'status 404(NotFoundException) を返す' do
                response.status.should == 404
              end
            end
          end
        
          context "設問と選択肢が矛盾している時" do
            before{get :show, {id: "first", enq_id: enqs(:incons_question).id, face: "SP", format: :json}}
        
            it 'status 500(DataIncompletedException) を返す' do
              response.status.should == 500
            end
          end
        end
      end
    end
  end
end
