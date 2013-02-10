class SessionsController < ApplicationController
  
  #skipping before filter for actions in sessions
  skip_before_filter :check_login, :only => [:new, :index, :create]
  
  def new
  end
  
  def index
    
  end
  
  def create
    user = User.authenticate(params[:username], params[:password])
    
    unless user.blank?
      session[:user_id] = user.id
      redirect_to root_url
    else
      render "new"
    end
  end
  
  def destroy
    session[:user_id] = nil
    render :nothing => true
  end
end
