# coding: utf-8

require 'pathname'

class CsvsController < ApplicationController
  def output
    require 'kconv'
    require 'csv'

	columns = Campaign.
	  includes([{:enq => [:enq_faces => [:enq_pages => [:enq_questions => [{:question => :choices}, :branches]]]]}, :answers]).
	  order('answers.user_id, answers.user_agent, enq_questions.num, choices.`order`').
	  where('answers.updated_at between ? and ?', params[:from], params[:to]).
	  find_by_mid(params[:campaign_id])
	file_name = Kconv.kconv("answer.csv", Kconv::SJIS)
	header = ["キャンペーンID", "アンケートID", "回答日", "ユーザID", "User-Agent"]
	columns.enq.enq_faces[0].enq_pages.each do |ep|
	  ep.enq_questions.each do |eq|
      header << "#{eq.seq}.#{eq.question.title}"
	  end
	end

	csv_data = CSV.generate("", {:encoding => 'sjis', :row_sep => "\r\n", :headers => header, :write_headers => true}) do |csv|
      column = []
	  tmp_name = ""
	  tmp_agent = ""
	  columns.answers.each do |ans|
	    if tmp_name != ans[:user_name] or tmp_agent != ans[:user_agent]
		  if tmp_name != ""
		    csv << column
		  end
		  tmp_name = ans[:user_name]
		  tmp_agent = ans[:user_agent]
		  column = []
          column << columns[:mid]
          column << columns[:enq_id]
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