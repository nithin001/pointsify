class BillsController < ApplicationController
  load_and_authorize_resource

  # GET /bills or /bills.json
  def index
    @bills = filtered_by_number
  end

  # GET /bills/1 or /bills/1.json
  def show
  end

  # GET /bills/new
  def new
    @bill = Bill.new
  end

  # GET /bills/1/edit
  def edit
  end

  # POST /bills or /bills.json
  def create
    @bill = Bill.new(bill_params)

    respond_to do |format|
      if @bill.save
        format.html { redirect_to bill_url(@bill), notice: "Bill was successfully created." }
        format.json { render :show, status: :created, location: @bill }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @bill.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bills/1 or /bills/1.json
  def update
    respond_to do |format|
      if @bill.update(bill_params)
        format.html { redirect_to bill_url(@bill), notice: "Bill was successfully updated." }
        format.json { render :show, status: :ok, location: @bill }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @bill.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bills/1 or /bills/1.json
  def destroy
    @bill.destroy

    respond_to do |format|
      format.html { redirect_to bills_url, notice: "Bill was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def filtered_by_number
    return all_bills unless params[:number].present?

    all_bills.where(phone_number: params[:number])
  end

  def all_bills
    current_user.preferred_organization.bills
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def bill_params
    params.fetch(:bill).permit(:phone_number, :amount).merge(organization: current_user.preferred_organization)
  end
end
