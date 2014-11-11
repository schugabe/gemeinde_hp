class AttachmentsController < ApplicationController
  before_action :set_event
  before_action :set_attachment, only: [:show, :edit, :update, :destroy]

  authorize_actions_for Event
    
  # GET /attachments
  # GET /attachments.json
  def index
    add_breadcrumb @event.title, @event
    @attachments = @event.attachments
  end

  # GET /attachments/1
  # GET /attachments/1.json
  def show
    redirect_to @event
  end

  # GET /attachments/new
  def new
    add_breadcrumb @event.title, @event
    add_breadcrumb "Anhänge", event_attachments_path(@event)
    @attachment = @event.attachments.build
  end

  # GET /attachments/1/edit
  def edit
    add_breadcrumb @event.title, @event
    add_breadcrumb "Anhänge", event_attachments_path(@event)
  end

  # POST /attachments
  # POST /attachments.json
  def create
    @attachment = @event.attachments.build(attachment_params)

    respond_to do |format|
      if @attachment.save
        format.html { redirect_to [@event, @attachment], notice: t('actions.created') }
        format.json { render action: 'show', status: :created, location: [@event, @attachment] }
      else
        format.html { render action: 'new' }
        format.json { render json: @attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /attachments/1
  # PATCH/PUT /attachments/1.json
  def update
    respond_to do |format|
      if @attachment.update(attachment_params)
        format.html { redirect_to [@event, @attachment], notice: t('actions.updated') }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /attachments/1
  # DELETE /attachments/1.json
  def destroy
    @attachment.destroy
    respond_to do |format|
      format.html { redirect_to event_attachments_path(@event) }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:event_id])
    end
    
    def set_attachment
      @attachment = @event.attachments.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def attachment_params
      params.require(:attachment).permit(:title, :description, :starts_at, :ends_at, :upload)
    end
end
