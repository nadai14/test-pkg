# coding: utf-8

class AnswersController < ApplicationController

  def create
    page = EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, {:enq_face => {:enq => :campaigns}}]).
      find_by_uuid(params[:page_id])
    raise NotFoundException.new PAGE_DOES_NOT_EXIST if page.nil?
    raise NotFoundException.new ID_MISS_MATCH_PAGE if page.enq_face.enq_id != params[:enq_id]
    raise NotFoundException.new ID_MISS_MATCH_CAMPAIGN unless page.enq_face.enq.campaigns.any? {|c| c.mid == params[:campaign_id]}
    answers = params.
      select{|k, v| k.start_with? "answer_"}.      
      each_with_object({}){|(k, v), a| n = k[7..-1].to_i; a[n] = [[v].flatten(1), page.enq_questions.find{|q| q.num == n}]}
    raise BadRequestException.new REQUIRED_QUESTION unless page.enq_questions.select{|q| q.question.required}.all?{|q| answers.has_key? q.num}
    raise BadRequestException.new IMVALID_QUESTION unless answers.all?{|k, (v, q)| valid?(k, v, q)}
    Answer.delete_all(:campaign_id => params[:campaign_id], :enq_question_id => page.enq_questions.map(&:uuid), :user_id => params[:uid])
    answers.each{|k, (v, q)| register(v, q.uuid, params[:campaign_id], params[:uid], request.headers["User-Agent"])}
  end

  private

  def valid?(num, content, enq_question)
    return false if enq_question.nil?
    question = enq_question.question
    return !question.required if content.all?{|c| c == ""}
    return false if question.needs_choices? && content.any?{|c| !question.choices.map(&:content).include?(c)}
    return false if question.kind == "numeric" && content.any?{|c| c =~ /[^0-9]+/}
    true
  end


  def register(content, enq_question_id, campaign_id, uid, user_agent)
    Answer.create(campaign_id: campaign_id, enq_question_id: enq_question_id, user_id: uid, user_agent: user_agent, answer: content.join("｜"))
  end

end
