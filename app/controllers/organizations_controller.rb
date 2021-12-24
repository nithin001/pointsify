class OrganizationsController < ApplicationController
  load_and_authorize_resource
  # GET /redemptions or /redemptions.json
  def index
  end

  # GET /redemptions/1 or /redemptions/1.json
  def show
  end

  # GET /organizations/new
  def new; end

  # GET /organizations/1/edit
  def edit; end

  def set_as_preferred
    respond_to do |format|
      current_user.set_preferred_organization(@organization)
      format.html { redirect_to organizations_path, notice: "#{@organization.name} set as default organization." }
      format.json { head :no_content }
    end
  end

  # POST /organizations
  # POST /organizations.json
  def create
    respond_to do |format|
      if @organization.save
        set_current_tenant(@organization)
        format.html { redirect_to organizations_path, notice: 'Organization was successfully created.' }
        format.json { render :show, status: :created, location: root_path }
      else
        format.html { render :new }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    respond_to do |format|
      if @organization.update(organization_params)
        format.html { redirect_to organizations_path, notice: 'Organization was successfully updated.' }
        format.json { render :show, status: :ok, location: root_path }
      else
        format.html { render :edit }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /organizations/1
  # DELETE /organizations/1.json
  def destroy
    @organization.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Organization was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def organization_params
    params.fetch(:organization).permit(:name, :discount_percentage).merge(owner: current_user)
  end
end
