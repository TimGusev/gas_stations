class UsersController < ApplicationController
  load_and_authorize_resource

  def show
    @hello = "hello #{current_user.username}"
  end

  def update
    @user.update(user_attributes)
    respond_with @user
  end

  private

  def user_attributes
    params.require(:user).permit(:email, :username)
  end
end
