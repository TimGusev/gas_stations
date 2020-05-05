class UsersController < ApplicationController
  load_and_authorize_resource
  before_action :check_rights

  def show
  end

  def update
    @user.update(user_attributes)
    respond_with @user
  end

  private

  def user_attributes
    params.require(:user).permit(:email, :username)
  end

  def check_rights
    raise CanCan::AccessDenied unless current_user&.admin? || current_user == @user
  end
end
