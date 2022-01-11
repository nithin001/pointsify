class StoresController < KioskApplicationController
  load_and_authorize_resource
  skip_before_action :check_for_store

  # GET /redemptions/1 or /redemptions/1.json
  def show
  end

  # GET /stores/new
  def new
    if current_user.owned_store.present?
      redirect_to edit_store_path(current_user.owned_store), alert: 'You can have only one store.'
    end
  end

  # GET /stores/1/edit
  def edit; end

  # POST /stores
  # POST /stores.json
  def create
    respond_to do |format|
      if @store.save
        format.html { redirect_to kiosk_root_path, notice: 'Store was successfully created.' }
        format.json { render :show, status: :created, location: kiosk_root_path }
      else
        format.html { render :new }
        format.json { render json: @store.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stores/1
  # PATCH/PUT /stores/1.json
  def update
    respond_to do |format|
      if @store.update(store_params)
        format.html { redirect_to edit_store_path(@store), notice: 'Store was successfully updated.' }
        format.json { render :show, status: :ok, location: kiosk_root_path }
      else
        format.html { render :edit }
        format.json { render json: @store.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def store_params
    params.fetch(:store).permit(:name, :discount_percentage, :contact_number).merge(owner: current_user)
  end
end
