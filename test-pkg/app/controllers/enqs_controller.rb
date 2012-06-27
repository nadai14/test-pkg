# coding: utf-8

class EnqsController < ApplicationController

  def show
    @enq = Enq.find_by_uuid(params[:id])
    raise NotFoundException.new ENQ_DOES_NOT_EXIST unless @enq
#    raise ForbiddenException.new BEFORE_OPENING if @enq.status == 0
    raise ForbiddenException.new AFTER_CLOSINGG if @enq.status == 9
  end

end
