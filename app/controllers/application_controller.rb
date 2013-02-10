class ApplicationController < ActionController::Base
  protect_from_forgery
  
  include ApplicationHelper
  
  helper_method :current_method
  
  # skipping before filter for the post request to work properly
  skip_before_filter :verify_authenticity_token
  
  # adding before filter to be executed before performing any task
  before_filter :check_login
  
  private
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def check_login
    unless logged_in?
      redirect_to new_session_url
    end
  end
end
