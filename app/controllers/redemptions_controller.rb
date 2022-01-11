class RedemptionsController < KioskApplicationController
  load_and_authorize_resource

  # GET /redemptions or /redemptions.json
  def index
    @redemptions = filtered_by_number
  end

  # GET /redemptions/1 or /redemptions/1.json
  def show
  end

  # GET /redemptions/new
  def new
    @redemption = Redemption.new
  end

  # GET /redemptions/1/edit
  def edit
  end

  # POST /redemptions or /redemptions.json
  def create
    @redemption = Redemption.new(redemption_params)

    respond_to do |format|
      if @redemption.save
        format.html { redirect_to redemption_url(@redemption), notice: "Redemption was successfully created." }
        format.json { render :show, status: :created, location: @redemption }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @redemption.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /redemptions/1 or /redemptions/1.json
  def update
    respond_to do |format|
      if @redemption.update(redemption_params)
        format.html { redirect_to redemption_url(@redemption), notice: "Redemption was successfully updated." }
        format.json { render :show, status: :ok, location: @redemption }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @redemption.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /redemptions/1 or /redemptions/1.json
  def destroy
    @redemption.destroy

    respond_to do |format|
      format.html { redirect_to redemptions_url, notice: "Redemption was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def filtered_by_number
    return all_redemptions unless params[:number].present?

    all_redemptions.where(phone_number: params[:number])
  end

  def all_redemptions
    current_user.owned_store.redemptions
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def redemption_params
    params.fetch(:redemption).permit(:phone_number, :points).merge(store: current_user.owned_store)
  end
end
