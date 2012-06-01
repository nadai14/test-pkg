
class EnqQuestionsController < ApplicationController
  # GET /enq_questions
  # GET /enq_questions.json
  def index
    @enq_questions = EnqQuestion.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @enq_questions }
    end
  end

  # GET /enq_questions/1
  # GET /enq_questions/1.json
  def show
    @enq_question = EnqQuestion.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @enq_question }
    end
  end

  # GET /enq_questions/new
  # GET /enq_questions/new.json
  def new
    @enq_question = EnqQuestion.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @enq_question }
    end
  end

  # GET /enq_questions/1/edit
  def edit
    @enq_question = EnqQuestion.find(params[:id])
  end

  # POST /enq_questions
  # POST /enq_questions.json
  def create
    @enq_question = EnqQuestion.new(params[:enq_question])

    respond_to do |format|
      if @enq_question.save
        format.html { redirect_to @enq_question, notice: 'Enq question was successfully created.' }
        format.json { render json: @enq_question, status: :created, location: @enq_question }
      else
        format.html { render action: "new" }
        format.json { render json: @enq_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /enq_questions/1
  # PUT /enq_questions/1.json
  def update
    @enq_question = EnqQuestion.find(params[:id])

    respond_to do |format|
      if @enq_question.update_attributes(params[:enq_question])
        format.html { redirect_to @enq_question, notice: 'Enq question was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @enq_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /enq_questions/1
  # DELETE /enq_questions/1.json
  def destroy
    @enq_question = EnqQuestion.find(params[:id])
    @enq_question.destroy

    respond_to do |format|
      format.html { redirect_to enq_questions_url }
      format.json { head :no_content }
    end
  end
end
