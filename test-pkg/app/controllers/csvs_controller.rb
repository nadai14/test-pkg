# coding: utf-8

require 'pathname'

class CsvsController < ApplicationController
  def output
    require 'kconv'
    require 'csv'
	require 'logger'

#    if :from != null and params[:to] != null
      columns = Answer.
        includes(:enq_question).
        order('answers.user_id, answers.user_agent, enq_questions.num').
        where('answers.campaign_id = ? AND answers.updated_at between ? and ?', params[:campaign_id], params[:from], params[:to]).
        find(:all)
#    elsif params[:from].nil? and params[:to].nil
#      columns = Campaign.
#        includes([{:enq => [:enq_faces => [:enq_pages => [:enq_questions => [{:question => :choices}, :branches]]]]}, :answers]).
#        order('answers.user_id, answers.user_agent, enq_questions.num, choices.`order`').
#        where('answers.updated_at >= ?', params[:from]).
#        find_by_mid(params[:campaign_id])
#    elsif params[:from].nil and params[:to].nil?
#      columns = Campaign.
#        includes([{:enq => [:enq_faces => [:enq_pages => [:enq_questions => [{:question => :choices}, :branches]]]]}, :answers]).
#        order('answers.user_id, answers.user_agent, enq_questions.num, choices.`order`').
#        where('answers.updated_at <= ?', params[:to]).
#        find_by_mid(params[:campaign_id])
#    else
#      columns = Campaign.
#        includes([{:enq => [:enq_faces => [:enq_pages => [:enq_questions => [{:question => :choices}, :branches]]]]}, :answers]).
#        order('answers.user_id, answers.user_agent, enq_questions.num, choices.`order`').
#        find_by_mid(params[:campaign_id])
#    end
    
	log = Logger.new(STDOUT)
	columns.each do |col|
	  log.debug("debug_enq_question_id :: #{col.enq_question_id}")
	end
	
    file_name = Kconv.kconv("answer.csv", Kconv::SJIS)
    
	@enq_page = EnqPage.
	  includes(:enq_questions).
	  where('enq_questions.uuid = ?', columns[0].enq_question_id).
	  find(:first)
	
	log.debug("debug_answer[0]_enq_question_id :: #{columns[0].enq_question_id}")
	log.debug("debug_enq_page :: #{@enq_page}")
	
	get_header = EnqQuestion.
	  includes([{:enq_page => :enq_face}, :question]).
	  order('enq_questions.num').
	  where('enq_faces.uuid = ?', @enq_page.enq_face_id).
	  find(:all)
	
    header = ["キャンペーンID", "アンケートID", "回答日", "ユーザID", "User-Agent"]
    get_header.each do |h|
      header << "#{h.seq}.#{h.question.title}"
    end
	
	campaign = Campaign.
	  includes(:enq).
	  find_by_mid(params[:campaign_id])
	  

    csv_data = CSV.generate("", {:encoding => 'sjis', :row_sep => "\r\n", :headers => header, :write_headers => true}) do |csv|
      column = []
      tmp_name = ""
      tmp_agent = ""
      columns.each do |ans|
        if tmp_name != ans[:user_name] or tmp_agent != ans[:user_agent]
          if tmp_name != ""
            csv << column
          end
          tmp_name = ans[:user_name]
          tmp_agent = ans[:user_agent]
          column = []
          column << campaign[:mid]
          column << campaign[:enq_id]
          column << ans[:updated_at]
          column << ans[:user_id]
          column << ans[:user_agent]
        end
        
        column << ans[:answer]
      end
      csv << column 
    end

    csv_data = csv_data.tosjis

    send_data(csv_data, :type => 'text/csv; charset=shift_jis; header=present', :filename => file_name)
  end
end