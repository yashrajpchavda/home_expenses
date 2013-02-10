# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  email         :string(255)
#  password_hash :string(255)
#  password_salt :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  password      :string(255)
#  username      :string(255)
#

class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation, :username, :password
  
  has_many :expenses
  has_many :budgets, :foreign_key => "month_owner_id", :class_name => "Budget"
  
  before_create :set_default_values
  
  def self.authenticate(username, password)
    user = find_by_username(username)
    
    if user && user.password == password
      user
    else
      nil
    end
  end
  
  def set_default_values
    self.created_at = Time.now
    self.updated_at = Time.now
  end
  
end
