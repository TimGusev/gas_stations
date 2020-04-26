class UsersController < ApplicationController
  load_and_authorize_resource

  def show
    @hello = "hello #{current_user.nickname}"
  end
end
