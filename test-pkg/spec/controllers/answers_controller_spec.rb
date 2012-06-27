#coding: utf-8
require 'spec_helper'
require 'support/custom_machers'
require "json/pure" # gem install json_pure

describe AnswersController do
  describe "回答送信機能テスト" do
    fixtures :enqs, :enq_faces, :enq_pages, :enq_questions, :choices, :branches, :questions, :answers, :campaigns
    render_views
    
    before do
      request.env['X-Requested-By'] = 'poncan-moviereward'
    end
    
    context "指定されたページヘのルートが正しく設定されているか" do
      context "/api/v1/enqs/1001/pages/1/campaigns/100/answers" do
        describe :routes do
          subject{{:post => "/api/v1/enqs/1001/pages/1/campaigns/100/answers"}}
          it{should route_to(controller: "answers", action: "create", enq_id: "1001", page_id: "1", campaign_id: "100", format: :json)}
        end
      end
      
      before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
             session_id: "session_id", uid: "uid", key: "mixi_uid", answer_1: "男性", answer_2: 24, format: :json}}
      
      describe :response do
        subject{response}
        it{should be_success}
      end
    end

    context "回答を送信する" do
      describe "回答は正しく登録されるか" do
        before do
          @answer = ['男性',24]
          @uid = "uid"
          @enq_id = enqs(:status1).id
          @enq_page_id = enq_pages(:sc_PC_page1).id
          @campaign_id = campaigns(:success_confirm).id
          post :create, {enq_id: @enq_id, page_id: @enq_page_id, campaign_id: @campaign_id,
                         session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}
        end

        it 'レスポンスフォーマットの確認' do
          response.should be_success
          response.content_type.should == Mime::JSON
        end

        it 'カラムの確認' do
          arr = JSON.parse(response.body)
          [:enq_id, :enq_page_id, :campaign_id].each do |key|
            arr.should have_key("#{key}")
          end
          arr["enq_id"].should == @enq_id
          arr["enq_page_id"].should == @enq_page_id
          arr["campaign_id"].should == @campaign_id
        end
        
        it 'レスポンスの表示(目検用)' do
          puts "response_body: #{response.body}"
        end
        
        it '回答の登録の確認' do
          enq_question_id = EnqQuestion.find(:all,
                                      :conditions => ["enq_page_id = ? and num = ?", @enq_page_id, 1]
                                      )
          result = Answer.find(:all,
                        :conditions => ["campaign_id = ? and enq_question_id = ? and user_id = ?", @campaign_id, enq_question_id, @uid]
                        )
          result.length.should == 1
          result[0]["answer"].should == @answer[0].to_s
          
          enq_question_id = EnqQuestion.find(:all,
                                      :conditions => ["enq_page_id = ? and num = ?", @enq_page_id, 2]
                                      )
          result = Answer.find(:all,
                        :conditions => ["campaign_id = ? and enq_question_id = ? and user_id = ?", @campaign_id, enq_question_id, @uid]
                        )
          result.length.should == 1
          result[0]["answer"].should == @answer[1].to_s
        end
      end
      
      describe "回答必須ではない設問に空文字列が渡された時" do
        context "numeric の場合" do
          before{post :create, {enq_id: enqs(:null_answer).id, page_id: enq_pages(:null_answer_SP_page1).id, campaign_id: campaigns(:null_answer).id,
                         session_id: "session_id", uid: "uid", key: "mixi_uid", answer_1: "", format: :json}}
          it '空の回答だと処理をスキップする' do
            response.should be_success
          end
        end
      
        context "radio の場合" do
          before{post :create, {enq_id: enqs(:null_answer).id, page_id: enq_pages(:null_answer_SP_page2).id, campaign_id: campaigns(:null_answer).id,
                         session_id: "session_id", uid: "uid", key: "mixi_uid", answer_2: "", format: :json}}
          it '空の回答だと処理をスキップする' do
            response.should be_success
            enq_question_id = EnqQuestion.find(:all,
                                      :conditions => ["enq_page_id = ? and num = ?", enqs(:null_answer).id, 2]
                                      )
            result = Answer.find(:all,
                        :conditions => ["campaign_id = ? and enq_question_id = ? and user_id = ?", campaigns(:null_answer).id, enq_questions(:null_answer_SP_page2), "uid"]
                        )
            result.length.should == 1
          end
        end
        
        context "selecet の場合" do
          before{post :create, {enq_id: enqs(:null_answer).id, page_id: enq_pages(:null_answer_SP_page3).id, campaign_id: campaigns(:null_answer).id,
                         session_id: "session_id", uid: "uid", key: "mixi_uid", answer_3: "", format: :json}}
          it '空の回答だと処理をスキップする' do
            response.should be_success
          end
        end
        
        context "check の場合" do
          before{post :create, {enq_id: enqs(:null_answer).id, page_id: enq_pages(:null_answer_SP_page4).id, campaign_id: campaigns(:null_answer).id,
                         session_id: "session_id", uid: "uid", key: "mixi_uid", answer_4: "", format: :json}}
          it '空の回答だと処理をスキップする' do
            response.should be_success
          end
        end
      end
      
      describe "異常系は動作しているか" do
        context "単一のException" do
          before do
            @answer = ['男性',24]
            @uid = "uid"
          end
      
          context "認可されていない時" do
            describe :response do
              before do
                request.env['X-Requested-By'] = 'failed_request'
                post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                               session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}
              end
            
              it 'status 401(UnauthorizedException) を返す' do
                response.status.should == 401
              end
            end
          end
        
          context "アンケートIDが存在しない時" do
            before{post :create, {enq_id: "failed_id", page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end
        
          context "ページIDが存在しない時" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: "failed_id", campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end
        
          context "キャンペーンIDとアンケートIDが矛盾している" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:nullable).id,
                                  session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end
        
          context "アンケートIDとページIDが矛盾している" do
            before{post :create, {enq_id: enqs(:nullable).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
            it 'status 404(NotFoundException) を返す' do
              response.status.should == 404
            end
          end

          context "アンケートページと回答の設問番号が矛盾している" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page3_1).id, campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: "文章です", format: :json}}
        
            it 'status 400(BadRequestException) を返す' do
              response.status.should == 400
            end
          end

          context "数値入力設問の回答が数値でない" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: "uid", key: "mixi_uid", answer_1: "男性", answer_2: "validate", format: :json}}
        
            it 'status 400(BadRequestException) を返す' do
              response.status.should == 400
            end
          end

          context "必須回答であるのに回答がない" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
               session_id: "session_id", uid: "uid", key: "mixi_uid", answer_1: "", answer_2: 24, format: :json}}
        
            it 'status 400(BadRequestException) を返す' do
              response.status.should == 400
            end
          end
        end

        context "複合したException" do
          context "アンケートページと回答の設問番号が矛盾している、かつ、数値入力設問の回答が数値でない" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_SP_page2).id, campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: "文章です", format: :json}}
        
            it 'status 400(BadRequestException) を返す' do
              response.status.should == 400
              JSON.parse(response.body)["message"].should == "回答必須の設問に回答していない"
            end
          end

          context "アンケートページと回答の設問番号が矛盾している、かつ、必須回答であるのに回答がない" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_SP_page3).id, campaign_id: campaigns(:success_confirm).id,
               session_id: "session_id", uid: "uid", key: "mixi_uid", answer_2: "", format: :json}}
        
            it 'status 400(BadRequestException) を返す' do
              response.status.should == 400
              JSON.parse(response.body)["message"].should == "回答必須の設問に回答していない"
            end
          end

          context "数値入力設問の回答が数値でない、かつ、必須回答であるのに回答がない" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: "uid", key: "mixi_uid", answer_1: "", answer_2: "validate", format: :json}}
        
            it 'status 400(BadRequestException) を返す' do
              response.status.should == 400
              JSON.parse(response.body)["message"].should == "回答に誤りが存在している"
            end
          end
          
          context "アンケートページと回答の設問番号が矛盾している、かつ、数値入力設問の回答が数値でない、かつ、必須回答であるのに回答がない" do
            before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                                  session_id: "session_id", uid: "uid", key: "mixi_uid", answer_3: "男性", answer_5: "validate", format: :json}}
        
            it 'status 400(BadRequestException) を返す' do
              response.status.should == 400
              JSON.parse(response.body)["message"].should == "回答必須の設問に回答していない"
            end
          end
        end
      end
    end
  end
end
