class UsersController < ApplicationController
  def new
  end

  def get_current_user
    user = User.find(session[:user_id])

    render :json => { :user_id => user.id, :username => user.username,  :email => user.email }
  end
end
