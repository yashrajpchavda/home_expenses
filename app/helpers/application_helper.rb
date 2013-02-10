module ApplicationHelper
  # check whehter user is logged in or not
  def logged_in?
    !!session[:user_id]
  end
end
