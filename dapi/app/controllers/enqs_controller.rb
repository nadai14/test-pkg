
class EnqsController < ApplicationController
  # GET /enqs/1
  # GET /enqs/1.json
  def getEnqs
    @enqs = Enq.find(:first,
	  :select => "page_id, css, movie, title, description",
	  :conditions => ["id = ?", params[:id]]
	  )

    respond_to do |format|
      if @enqs
	    @enq_result = true		
        format.html  { render :action => "show" }
        format.json  { render :json => [@enqs, @enq_result] }
      else
	    @enq_result = false
		@err_msg = 'get errot'
        format.html  { render :action => "index" }
        format.json  { render :json => [@enqs.errors, @enq_result, @err_msg]}
      end
    end
  end

  # GET /enqs
  # GET /enqs.json
  def index
    @enqs = Enq.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @enqs }
    end
  end

  # GET /enqs/1
  # GET /enqs/1.json
  def show
    @enq = Enq.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @enq }
    end
  end

  # GET /enqs/new
  # GET /enqs/new.json
  def new
    @enq = Enq.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @enq }
    end
  end

  # GET /enqs/1/edit
  def edit
    @enq = Enq.find(params[:id])
  end

  # POST /enqs
  # POST /enqs.json
  def create
    @enq = Enq.new(params[:enq])

    respond_to do |format|
      if @enq.save
        format.html { redirect_to @enq, notice: 'Enq was successfully created.' }
        format.json { render json: @enq, status: :created, location: @enq }
      else
        format.html { render action: "new" }
        format.json { render json: @enq.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /enqs/1
  # PUT /enqs/1.json
  def update
    @enq = Enq.find(params[:id])

    respond_to do |format|
      if @enq.update_attributes(params[:enq])
        format.html { redirect_to @enq, notice: 'Enq was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @enq.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /enqs/1
  # DELETE /enqs/1.json
  def destroy
    @enq = Enq.find(params[:id])
    @enq.destroy

    respond_to do |format|
      format.html { redirect_to enqs_url }
      format.json { head :no_content }
    end
  end
end
