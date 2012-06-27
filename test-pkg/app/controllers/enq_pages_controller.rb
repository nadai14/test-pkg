# coding: utf-8

class EnqPagesController < ApplicationController

  def show
    @page = EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, :enq_face]).
      order('enq_questions.num, choices.`order`').
      find_by_uuid(params[:id])
    raise NotFoundException.new PAGE_DOES_NOT_EXIST if @page.nil?
    raise NotFoundException.new ID_MISS_MATCH_PAGE if @page.enq_face.enq_id != params[:enq_id]
    raise DataIncompletedException.new IMVALID_QUESTION if @page.enq_questions.any? {|eq| eq.question.needs_choices? && eq.question.choices.empty?}
    # TODO: move to the campaigin api
    @count = EnqQuestion.
      includes(:enq_page => {:enq_face => :enq}).
      where('enqs.uuid = ? AND enq_faces.face = ?', @page.enq_face.enq_id, @page.enq_face.face).
      count(:uuid)
  end

end
