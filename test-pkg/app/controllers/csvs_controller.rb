# coding: utf-8

require 'pathname'

class CsvsController < ApplicationController
  def output
    require "csv"
#    output = Campaign.includes(:enq => [:enq_faces => [:enq_pages => [:enq_questions => [{:question => :choices}, :answers, :branches]]]]).find(:all)
    output_campaign = Campaign.find(:all)
    output_enq = Enq.find(:all)
    output_e_face = EnqFace.find(:all)
    output_e_page = EnqPage.find(:all)
    output_e_question = EnqQuestion.find(:all)
    output_branch = Branch.find(:all)
    output_choice = Choice.find(:all)
    output_question = Question.find(:all)
    output_answer = Answer.find(:all)
	
	CSV.open('C:\Users\koji16\Desktop\drecom_projects\test-pkg\test-pkg\public\csv\putput.csv', 'w') do |csv|
#	  csv << [output]
#      csv << [output_campaign, output_enq, output_e_face, output_e_page, output_e_question, output_branch, output_choice, output_question, output_answer]
      csv << [output_campaign]
      csv << [output_enq]
      csv << [output_e_face]
      csv << [output_e_page]
      csv << [output_e_question]
      csv << [output_branch]
      csv << [output_choice]
      csv << [output_question]
      csv << [output_answer]
	end
  end
  
  def export
    require 'csv'
    require 'kconv'
 
    headers['Content-Type'] = 'application/octet-stream;'
    headers['Content-Disposition'] = 'attachment; filename="out.csv"'
 
    render :text => proc {|response, output|
      list = Hoge.find(:all)
      list.each {|e|
        row = [e[:hoge].tosjis, e[:fuga].tosjis, e[:foo], e[:bar]]
        output.write(CSV.generate_line(row) + "\n")
        # for 2.2.X: output << CSV.generate_line(row) + "\n"
      }
    }
  end
end