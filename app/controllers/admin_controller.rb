class AdminController < ApplicationController  
  def index
    @users = User.all
  end

  def destroy
    byebug.pry
  	User.where(id: admin_attributes.id).destroy_all
  end

  def update
  	admin_attributes.each do |user|
  		User.find(user.id).update(admin: user.admin, email: user.email, username: user.username)
    end
  end

  private

  def admin_attributes
    params.require(:admin).permit(:id, :email, :admin, :username)
  end
end
