class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :edit, :update, :destroy]
  respond_to :html, :js
  
  # GET /locations
  # GET /locations.json
  def index
    @locations = Location.all
    @location = Location.new

  end

  # GET /locations/1
  # GET /locations/1.json
  def show
  end

  # GET /locations/new
  def new
    @location = Location.new
  end

  # GET /locations/1/edit
  def edit
    
    respond_to do |format|
      format.js { render layout: false, content_type: 'text/javascript' }
    end
  end

  # POST /locations
  # POST /locations.json
  def create
    @location = Location.new(location_params)
    @location.save
    
    @locations = Location.all
    respond_to do |format|
      format.js { render layout: false, content_type: 'text/javascript' }
    end
    
  end

  # PATCH/PUT /locations/1
  # PATCH/PUT /locations/1.json
  def update
    respond_to do |format|
      if @location.update(location_params)
        format.html { redirect_to @location, notice: 'Location was successfully updated.' }
        format.json { render :show, status: :ok, location: @location }
      else
        format.html { render :edit }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /locations/1
  # DELETE /locations/1.json
  def destroy
    @location.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def location_params
      params.require(:location).permit(:xcoord, :ycoord, :name)
    end
end
