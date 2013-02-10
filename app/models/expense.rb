# == Schema Information
#
# Table name: expenses
#
#  id           :integer          not null, primary key
#  expense_type :string(255)
#  description  :text
#  payment_type :string(255)
#  amount       :float
#  paid_date    :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer
#  budget_id    :integer
#  is_extra     :boolean
#

class Expense < ActiveRecord::Base
  # accessors 
  attr_accessible :amount, :description, :expense_type, :paid_date, :payment_type, :user_id, :budget_id, :is_extra
  
  # validation rules
  validates :amount, :presence => true, :numericality => :true
  validates :description, :presence => true
  validates :paid_date, :presence => true
  validates :payment_type, :presence => true
  validates :expense_type, :presence => true
  
  # relationships
  belongs_to :user
  belongs_to :budget
  
  before_create :set_default_values
  
  
  def save_it(exp)
    if self.is_extra?(exp["user_id"])
      exp["is_extra"] = true
    else
      exp["is_extra"] = false
    end
    
    exp["budget_id"] = Budget.current_month_budget.id if exp["budget_id"].blank?
    
    self.update_attributes(exp)
  end
  
  def get_expense(session_user_id)
    { :id => self.id, :description => self.description, :expense_type => self.expense_type, :payment_type => self.payment_type, \
      :amount => self.amount, :user_id => self.user.id, :paid_date => (Date.strptime(self.paid_date.to_s, "%Y-%m-%d %H:%M:%S %Z").strftime("%d/%m/%Y")), \
      :is_editable => (session_user_id == self.user.id) ? true : false, :username => (session_user_id == self.user.id) ? "You" : self.user.username }
  end
  
  def is_extra?(user_id)
    # finding current month's budget instance 
    month_owner = Budget.current_month_budget.month_owner.id
    user_id != month_owner
  end
  
  def self.current_month_extra_expenses(current_month_budget)
    total_cash = 0
    total_sodexo = 0
    
    #extra_expenses = Expense.find(:all, :conditions => ["month(paid_date) = ? and year(paid_date) = ? and is_extra = ?", Time.now.month, \
    #  Time.now.year, true])
    extra_expenses = current_month_budget.expenses.find(:all, :conditions => ["is_extra = ?", true])
      
    user_expenses = Hash.new
    
    users = User.all
    
    users.each do |user|
      username = user.username
      user_expenses[username] = Hash.new(0)
      user_expenses[username]["user_id"] = user.id
    end
    
    extra_expenses.each do |expense|
      user_expenses[expense.user.username][expense.payment_type] += expense.amount
      if expense.payment_type == "Sodexo"
        total_sodexo += expense.amount
      else
        total_cash += expense.amount
      end
    end
        
    results = Array.new
    
    user_expenses.each do |key, value|
      results.push({ "username" => key, "cash" => value["Cash"], "sodexo" => value["Sodexo"], "id" => value["user_id"] })
    end
    
    results.push({ "username" => "Total", "cash" => total_cash, "sodexo" => total_sodexo })
    
    results
    
  end
  
  def set_default_values
    self.created_at = Time.now
    self.updated_at = Time.now
  end
end
