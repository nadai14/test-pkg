#coding: utf-8
require 'spec_helper'
require 'support/custom_machers'
require "json/pure" # gem install json_pure

describe CampaignsController do
  describe "キャンペーン情報取得機能テスト" do
    fixtures :campaigns, :enq_faces, :enqs
    render_views
 
    before do
      request.env['X-Requested-By'] = 'poncan-moviereward'
    end

    context "ルートが正しく設定されているか" do

      describe :routes do
        subject{{:get => "/api/v1/campaigns/1"}}
        it{should route_to(controller: "campaigns", action: "show", id: "1", format: :json)}
      end
      
      before{get :show, {id: campaigns(:success_confirm).id, face: "PC", format: :json}}
      
      describe :response do
        subject{response}
        it{should be_success}
      end
    end

    context "MIDとフェイスから値を取得する" do
      describe "レスポンスは正しく返ってきているか" do
        before {get :show,{id: campaigns(:success_confirm).id, face: "PC", format: :json}}

        it 'レスポンスフォーマットの確認' do
          response.should be_success
          response.content_type.should == Mime::JSON
        end

        it 'カラムの確認' do
          [:mid, :enq_id, :platform, :first_page_id, :wait_until, :css, :movie, :thumbnail, :point,
                :title, :description, :message, :conversion_tag, :second_picture, :second_point, :client_url].each do |key|
            response.body.should have_json("/#{key}") 
          end
        end

        it 'レスポンスの表示(目検用)' do
          puts "campaign_response_body: #{response.body}"
        end
      end
          
      describe "要素が nil の時" do
        context "PCからアクセスした場合" do
          before {get :show,{id: campaigns(:nullable).id, face: "PC", format: :json}}

          context "デフォルト値が設定されていると" do
            def_css = "/css/pc/themes/default/style.css"
            def_title = ""
            def_desc = JSON.utf8_to_json_ascii('<p>動画を見ながらアンケートに答えてプレゼントをもらおう！</p><p>#{point}ポイントプレゼント</p>')
            message = JSON.utf8_to_json_ascii('<p>アンケートは終了です。ありがとうございました。</p>')
            it 'デフォルト値を返しているか' do
              response.body.should include(def_css)
              response.body.should include(def_title)
              response.body.should include(def_desc)
              response.body.should include(message)
            end
          end
            
          context "デフォルト値が設定されていないと" do
            it '要素を返していないか' do
              [:wait_until, :movie, :thumbnail, :conversion_tag, :second_picture, :second_point, :client_url].each do |key|
                response.body.should_not have_json("/#{key}") 
              end
            end          
          end
        end

        context "スマートフォンからアクセスした場合" do
          before {get :show,{id: campaigns(:nullable).id, face: "SP", format: :json}}

          context "デフォルト値が設定されていると" do
            def_css = "/css/sp/themes/default/style.css"
            def_title = ""
            def_desc = JSON.utf8_to_json_ascii('<p>動画を見ながらアンケートに答えて#{point}ポイントもらおう</p>')
            message = JSON.utf8_to_json_ascii('<p>アンケートは終了です。ありがとうございました。</p>')
            it 'デフォルト値を返しているか' do
              response.body.should include(def_css)
              response.body.should include(def_title)
              response.body.should include(def_desc)
              response.body.should include(message)
            end
          end
            
          context "デフォルト値が設定されていないと" do
             it '要素を返していないか' do
              [:wait_until, :movie, :thumbnail, :conversion_tag, :second_picture, :second_point, :client_url].each do |key|
                response.body.should_not have_json("/#{key}") 
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
              get :show, {id: campaigns(:success_confirm).id, face: "SP", format: :json}
            end
            
            it 'status 401(UnauthorizedException) を返す' do
              response.status.should == 401
            end
          end
        end
        
        context "キャンペーンIDが存在しない時" do
          before{get :show, {id: "Unknown_id", face: "SP", format: :json}}
        
          it 'status 404(NotFoundException) を返す' do
            response.status.should == 404
          end
        end
        
        context "status == 0 状態が入稿前の時" do
          before{get :show, {id: campaigns(:camp_status0).id, face: "SP", format: :json}}
        
          it 'status 403(ForbiddenException)　を返す' do
            response.status.should == 403
          end
        end
        
        context "status == 1 で状態が終了の時" do
          before{get :show, {id: campaigns(:camp_status9).id, face: "SP", format: :json}}
        
          it 'status 403(ForbiddenException) を返す' do
            response.status.should == 403
          end
        end
        
        context "closed_date の時間を超えている" do
          before{get :show, {id: campaigns(:camp_closed).id, face: "SP", format: :json}}
        
          it 'status 403(ForbiddenException) を返す' do
            response.status.should == 403
          end
        end
      end
    end
  end
end