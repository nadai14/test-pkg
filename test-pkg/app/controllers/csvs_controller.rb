# coding: utf-8

require 'pathname'

class CsvsController < ApplicationController
  def output
    require "csv"

    output_answer = Answer.find(:all)
	
	CSV.open('C:\Users\koji16\Desktop\drecom_projects\test-pkg\test-pkg\public\csv\putput.csv', 'w') do |csv|
      csv << [output_answer]
	end
  end
  
  def export
    require 'csv'
    require 'kconv'
 
    headers['Content-Type'] = 'application/octet-stream;'
    headers['Content-Disposition'] = 'attachment; filename="answers.csv"'
 
    render :text => proc {|response, output|
      list = Answer.find(:all)
      list.each {|e|
        row = [e[:uuid], e[:campaign_id], e[:enq_question_id], e[:user_id], e[:user_agent], e[:answer], e[:updated_by], e[:updated_at]]
        output << CSV.generate_line(row) + "\n"
      }
    }
  end
end