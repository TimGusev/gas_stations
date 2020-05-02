class AdminController < ApplicationController
  def index
    @users = User.all
  end

  def destroy
  	User.where(id: admin_attributes["selectedRows"].collect { |el| el["id"] }).destroy_all
  end

  def update
  	admin_attributes["selectedRows"].each do |user|
  		User.find(user.id).update(admin: user.admin, email: user.email, username: user.username)
    end
  end

  private

  def admin_attributes
    params.require(:admin)
  end
end
