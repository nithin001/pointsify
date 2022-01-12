class RedemptionFlowsController < ApplicationController
  load_and_authorize_resource

  # GET /redemption_flows or /redemption_flows.json
  def index
    @redemption_flows = filtered_by_number
  end

  # GET /redemption_flows/1 or /redemption_flows/1.json
  def show
  end

  # GET /redemption_flows/new
  def new
    @redemption_flow = RedemptionFlow.new
  end

  # GET /redemption_flows/1/edit
  def edit
  end

  # POST /redemption_flows or /redemption_flows.json
  def create
    @redemption_flow = RedemptionFlow.new(redemption_flow_params)

    respond_to do |format|
      if @redemption_flow.save
        if @redemption_flow.redemption_amount
          @redemption_flow.update_attribute(:otp, '121212')
        end
        format.html { redirect_to redemption_flow_url(@redemption_flow), notice: "Redemption attempt was successfully created." }
        format.json { render :show, status: :created, location: @redemption_flow }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @redemption_flow.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /redemption_flows/1 or /redemption_flows/1.json
  def update
    respond_to do |format|
      @redemption_flow.assign_attributes(redemption_flow_params)
      if @redemption_flow.save
        if @redemption_flow.redeem_points?
          Bill.create!(store: @redemption_flow.store, phone_number: @redemption_flow.phone_number, amount: @redemption_flow.bill_amount, parent: @redemption_flow)
          Reward.create!(amount: ((@redemption_flow.bill_amount.to_i *@redemption_flow.store.discount_percentage)/100), phone_number: @redemption_flow.phone_number, store: @redemption_flow.store, parent: @redemption_flow)
          Redemption.create!(store: @redemption_flow.store, phone_number: @redemption_flow.phone_number, amount: @redemption_flow.redemption_amount, parent: @redemption_flow)
        end

        if @redemption_flow.only_bill?
          Bill.create!(store: @redemption_flow.store, phone_number: @redemption_flow.phone_number, amount: @redemption_flow.bill_amount, parent: @redemption_flow)
          Reward.create!(amount: ((@redemption_flow.bill_amount.to_i *@redemption_flow.store.discount_percentage)/100), phone_number: @redemption_flow.phone_number, store: @redemption_flow.store, parent: @redemption_flow)
        end

        if @redemption_flow.get_otp? && @redemption_flow.redemption_amount && !@redemption_flow.otp
          @redemption_flow.update_attribute(:otp, '121212')
        end

        format.html { redirect_to bill_url(@bill), notice: "Bill was successfully updated." }
        format.json { render :show, status: :ok, location: @redemption_flow }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @redemption_flow.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /redemption_flows/1 or /redemption_flows/1.json
  def destroy
    @redemption_flow.destroy

    respond_to do |format|
      format.html { redirect_to redemption_flows_url, notice: "Redemption attempt was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def filtered_by_number
    return all_redemption_flows unless params[:number].present?

    all_redemption_flows.where(phone_number: params[:number])
  end

  def all_redemption_flows
    current_user.owned_store.redemption_flows.where(status: [0,1])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def redemption_flow_params
    params.fetch(:redemption_flow)
          .permit(:phone_number, :bill_amount, :redemption_amount, :current_otp, :status)
          .merge(store: current_user.owned_store)
  end
end
