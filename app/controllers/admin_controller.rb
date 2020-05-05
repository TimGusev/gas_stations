class AdminController < ApplicationController
  before_action :check_rights
  
  def index
    @users = User.all
  end

  def destroy
  	User.where(id: admin_attributes["selectedRows"].collect { |el| el["id"] }).destroy_all
  end

  def make_admin
  	admin_attributes.collect { |el| el["id"] }.each do |id|
      User.find(id).update(admin: true)
    end
  end

  def drop_admin
    admin_attributes.collect { |el| el["id"] }.each do |id|
      User.find(id).update(admin: false)
    end
  end

  private

  def check_rights
    raise CanCan::AccessDenied unless current_user&.admin?
  end

  def admin_attributes
    params.require(:admin)
  end
end
